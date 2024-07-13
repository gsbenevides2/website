import * as cors from "cors";
import * as express from "express";
import * as admin from "firebase-admin";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/emails", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }
  try {
    await admin.firestore().collection("emails").add({ email });
    return res.status(201).send("Email added");
  } catch (e) {
    return res.status(500).send("Error adding email");
  }
});

app.post("/reports", async (req, res) => {
  const { report, email } = req.body;
  if (!report) {
    return res.status(400).send("Report is required");
  }
  if (!email) {
    return res.status(400).send("Email is required");
  }
  try {
    await admin.firestore().collection("reports").add({ report, email });
    return res.status(201).send("Report added");
  } catch (e) {
    return res.status(500).send("Error adding report");
  }
});

export const decoMiddleware = app;
