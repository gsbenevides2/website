import * as express from "express";
import * as admin from "firebase-admin";

const app = express();

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const origem = req.query.origem ?? "https://gui.dev.br";
  const page404 = `${origem}/404`;
  const page500 = `${origem}/500`;
  try {
    const document = await admin.firestore().collection("links").doc(id).get();
    if (!document.exists) {
      return res.redirect(page404);
    }
    return res.redirect(document.data()?.url ?? page500);
  } catch (e) {
    return res.redirect(page500);
  }
});

export const linksMiddleware = app;
