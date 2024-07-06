import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { onDocumentDeleted } from "firebase-functions/v2/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2/options";
import { linksMiddleware } from "./links";
import { statusMiddleware } from "./status";
import { deleteStorageFolder } from "./utils";
admin.initializeApp();

setGlobalOptions({
  maxInstances: 1,
});

export const deletedBlogPost = onDocumentDeleted(
  "posts/{blogPostId}",
  async (event) => {
    logger.info("Deleted post", { structuredData: true });
    const blogPostId = event.params.blogPostId;
    await deleteStorageFolder(`posts/${blogPostId}`);
  },
);

export const deleteCertificate = onDocumentDeleted(
  "certifications/{certificateId}",
  async (event) => {
    logger.info("Deleted certificate", { structuredData: true });
    const certificateId = event.params.certificateId;
    await deleteStorageFolder(`certifications/${certificateId}`);
  },
);

export const deleteProject = onDocumentDeleted(
  "projects/{projectId}",
  async (event) => {
    logger.info("Deleted project", { structuredData: true });
    const projectId = event.params.projectId;
    await deleteStorageFolder(`projects/${projectId}`);
  },
);

export const links = onRequest(linksMiddleware);

export const status = onRequest(statusMiddleware);
