import "dotenv/config";
import express from "express";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import multer from "multer";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const adminUserEmail = "gsbenevides2@gmail.com";

function loadGCPCredentials() {
  const stringB64 = process.env.GCP_CREDENTIALS;
  if (!stringB64) {
    throw new Error("GCP_CREDENTIALS is required");
  }
  const buff = Buffer.from(stringB64, "base64");
  const json = buff.toString("ascii");
  return JSON.parse(json);
}
console.log("Initializing Firebase");
const firebaseApp = initializeApp({
  credential: cert(loadGCPCredentials()),
});
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

console.log("Firebase initialized");

interface StorageData {
  visible: boolean;
  filename: string;
  allowedUsers: string[];
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "files"),
  filename: (req, file, cb) => {
    cb(null, req.body.id);
  },
});

app.get("/download", async (req, res) => {
  const { id } = req.query;
  console.log({ id });

  if (!id) {
    return res.status(400).send("Id is required");
  }

  if (typeof id !== "string") {
    return res.status(400).send("Id must be a string");
  }

  const docRef = db.collection("storage").doc(id);
  console.log("Querying Firestore for document");
  const doc = await docRef.get();
  console.log("Firestore query complete");
  console.log({ doc });
  if (!doc.exists) {
    return res.status(404).send("Not found");
  }
  const data = doc.data() as StorageData;

  const sendFile = () => {
    res.header("Content-Disposition", `attachment; filename=${data.filename}`);
    res.sendFile(path.join(__dirname, "files", id));
  };

  if (!data.visible) {
    const idToken = req.header("Authorization");
    if (!idToken) {
      return res.status(401).send("Unauthorized");
    }
    try {
      const decodecToken = await auth.verifyIdToken(idToken);
      if (!decodecToken.email) return res.status(401).send("Unauthorized");
      if (
        !data.allowedUsers.includes(decodecToken.email) &&
        decodecToken.email !== adminUserEmail
      ) {
        return res.status(401).send("Unauthorized");
      }
      sendFile();
    } catch (e) {
      console.error(e);
      return res.status(401).send("Unauthorized");
    }
  }

  sendFile();
});

app.post(
  "/upload",
  async (req, res) => {
    const { id } = req.body;
    const idToken = req.header("Authorization");
    if (!idToken) {
      return res.status(401).send("Unauthorized");
    }
    if (!id) {
      return res.status(400).send("Id is required");
    }
    if (typeof id !== "string") {
      return res.status(400).send("Id must be a string");
    }
    const decodecToken = await auth.verifyIdToken(idToken);
    if (!decodecToken.email) return res.status(401).send("Unauthorized");
    if (decodecToken.email !== adminUserEmail) {
      return res.status(401).send("Unauthorized");
    }
  },
  multer({ storage }).single("file"),
  (_req, res) => {
    res.send("Uploaded");
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
