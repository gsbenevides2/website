import * as express from "express";
import * as admin from "firebase-admin";

const app = express();

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const fileData = await admin.firestore().collection("storage").doc(id).get();
  if (!fileData.exists) {
    return res.status(404).send("File not found");
  }
  const file = fileData.data();
  if (!file?.visible || !file?.filename) {
    return res.status(404).send("File not found");
  }
  const fileRef = await admin
    .storage()
    .bucket()
    .file(`storage/${id}/${file.filename}`);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${file.filename}"`,
  );
  const [metadata] = await fileRef.getMetadata();
  res.setHeader("Content-Type", metadata["contentType"]);
  return fileRef.createReadStream().pipe(res);
});

export const storageMiddleware = app;
