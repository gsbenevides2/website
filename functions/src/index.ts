import * as logger from "firebase-functions/logger";
import {onDocumentDeleted} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import {setGlobalOptions} from "firebase-functions/v2/options";
import {onRequest} from "firebase-functions/v2/https";
import {FieldValue} from "firebase-admin/firestore";

admin.initializeApp();

setGlobalOptions({
  maxInstances: 1,
});

/**
 * Deletes a storage folder.
 * @param {string} path - The path of the folder to delete.
 * @return {Promise<void>}
 */
async function deleteStorageFolder(path: string): Promise<void> {
  const bucket = admin.storage().bucket();
  await bucket.deleteFiles({prefix: path});
}

export const deletedBlogPost = onDocumentDeleted(
  "posts/{blogPostId}",
  async (event) => {
    logger.info("Deleted post", {structuredData: true});
    const blogPostId = event.params.blogPostId;
    await deleteStorageFolder(`posts/${blogPostId}`);
  }
);

export const deleteCertificate = onDocumentDeleted(
  "certifications/{certificateId}",
  async (event) => {
    logger.info("Deleted certificate", {structuredData: true});
    const certificateId = event.params.certificateId;
    await deleteStorageFolder(`certifications/${certificateId}`);
  }
);

export const deleteProject = onDocumentDeleted(
  "projects/{projectId}",
  async (event) => {
    logger.info("Deleted project", {structuredData: true});
    const projectId = event.params.projectId;
    await deleteStorageFolder(`projects/${projectId}`);
  }
);

interface Status {
  type: string;
  message: string;
}

/**
  * Sends a notification to all users subscribed to the server status.
  * @param {Status} status - The status to send.
  * @return {Promise<void>}
  */
async function sendStatusNotificationToUsers(status:Status) {
  const db = admin.firestore();
  const usersRef = db.collection("mc_push_subscriptions");
  const users = await usersRef.get();
  const tokens:string[] = [];
  users.forEach((user) => {
    const userTokens = user.data().tokens;
    tokens.push(...userTokens);
  });
  if(tokens.length === 0) return;
  await admin.messaging().sendEachForMulticast({
    tokens,
    notification: {
      title: "Status do Servidor: " + status.type,
      body: status.message,
    },
    webpush: {
      notification: {
        body: status.message,
        title: "Status do Servidor: " + status.type,
        actions: [
          {
            action: "open",
            title: "Abrir",
          },
        ]
      },
    },
  });
}

export const saveStatus = onRequest(
  {secrets: ["MINECRAFT_TOKEN"]},
  async (req, res) => {
    const method = req.method;
    if (method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }
    const status = req.body;
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }

    if (token !== process.env.MINECRAFT_TOKEN) {
      res.status(403).send("Forbidden");
      return;
    }

    if (!status.type || !status.message) {
      res.status(400).send("Bad Request");
      return;
    }

    const db = admin.firestore();
    const statusRef = await db.collection("mc_status").add({
      type: status.type,
      message: status.message,
      date: FieldValue.serverTimestamp(),
    });
    await sendStatusNotificationToUsers(status);
    res.status(200).send(statusRef.id);
  }
);
