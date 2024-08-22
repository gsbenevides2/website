import { CollectionReference, DocumentData, Timestamp } from "firebase-admin/firestore";
import { NextApiResponse } from "next";
import Firebase from "./config";

export function downloadStream(id: string, fileName: string, res: NextApiResponse) {
  const storage = Firebase.getStorage();
  const storageFile = storage.bucket().file(`storage/${id}/${fileName}`);
  const size = storageFile.getMetadata().then((metadata) => metadata[0].size);
  const fileType = storageFile.getMetadata().then((metadata) => metadata[0].contentType);
  const stream = storageFile.createReadStream();

  res.setHeader("Content-Length", size.toString());
  res.setHeader("Content-Type", fileType.toString());
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

  stream.on("error", (err) => {
    res.status(500).send({ error: "Internal server error" });
    console.error(err);
  });

  stream.pipe(res);
}

export interface SelfStorageFileDocument extends DocumentData {
  dateOfCreation: Timestamp;
  dateOfLastUpdate: Timestamp;
  visible: boolean;
  filename: string;
  allowedUsers: string[];
}

export function getFileInfo(id: string) {
  const db = Firebase.getFirestore();
  const collection = db.collection("storage") as CollectionReference<SelfStorageFileDocument>;
  const document = collection.doc(id);
  return document.get().then((snapshot) => {
    if (!snapshot.exists) return null;
    const data = snapshot.data();
    if (!data) return null;
    return {
      dateOfCreation: data.dateOfCreation.toDate(),
      dateOfLastUpdate: data.dateOfLastUpdate.toDate(),
      visible: data.visible,
      filename: data.filename,
      allowedUsers: data.allowedUsers,
    };
  });
}
