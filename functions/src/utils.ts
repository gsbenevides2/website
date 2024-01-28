import * as admin from "firebase-admin";

/**
 * Deletes a storage folder.
 * @param {string} path - The path of the folder to delete.
 * @return {Promise<void>}
 */
export async function deleteStorageFolder(path: string): Promise<void> {
  const bucket = admin.storage().bucket();
  await bucket.deleteFiles({prefix: path});
}
