import * as logger from "firebase-functions/logger";
import {onDocumentDeleted} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import {setGlobalOptions} from "firebase-functions/v2/options";

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
