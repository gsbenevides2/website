import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, Timestamp, addDoc, collection } from "firebase/firestore";
import { FirebaseStorage, getBytes, listAll, ref, uploadString } from "firebase/storage";
import { dispatchLog, registerTest } from "../../utils";

export default async function runStorageFilesTests(storage: FirebaseStorage, testEnv: RulesTestEnvironment, firestore: Firestore) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const adminFirestore = admin.firestore();

  const nomPublicFile = await addDoc(collection(adminFirestore, "storage"), {
    filename: "file.txt",
    dateOfCreation: Timestamp.now(),
    dateOfLastUpdate: Timestamp.now(),
    visible: false,
    allowedUsers: [],
  });
  await uploadString(ref(admin.storage(), `storage/${nomPublicFile.id}/file.txt`), "Hello World!");

  const restrictedFile = await addDoc(collection(adminFirestore, "storage"), {
    filename: "file.txt",
    dateOfCreation: Timestamp.now(),
    dateOfLastUpdate: Timestamp.now(),
    visible: false,
    allowedUsers: ["notAdmin@gmail.com"],
  });
  await uploadString(ref(admin.storage(), `storage/${restrictedFile.id}/file.txt`), "Hello World!");

  const publicFile = await addDoc(collection(adminFirestore, "storage"), {
    filename: "file.txt",
    dateOfCreation: Timestamp.now(),
    dateOfLastUpdate: Timestamp.now(),
    visible: true,
    allowedUsers: [],
  });
  await uploadString(ref(admin.storage(), `storage/${publicFile.id}/file.txt`), "Hello World!");

  dispatchLog("info", "Starting tests for storage files rules");

  await registerTest("Try to save file in storage with not authenticated user, it should fail", () => assertFails(uploadString(ref(storage, "storage/exemple.txt"), "Hello World!")));
  await registerTest("Try to save file in storage with authenticated user admin gsbenevides2, it should success", () => assertSucceeds(uploadString(ref(admin.storage(), "storage/exemple.txt"), "Hello World!")));
  await registerTest("Try to save file in storage with authenticated user notAdminUser, it should fail", () => assertFails(uploadString(ref(notAdminUser.storage(), "storage/exemple.txt"), "Hello World!")));

  await registerTest("Try to read file in storage with not authenticated user, it should fail", () => assertFails(getBytes(ref(storage, `storage/exemple.txt`))));
  await registerTest("Try to read file in storage with authenticated user notAdminUser, it should fail", () => assertFails(getBytes(ref(notAdminUser.storage(), `storage/exemple.txt`))));
  await registerTest("Try to read file in storage with authenticated user admin gsbenevides2, it should success", () => assertSucceeds(getBytes(ref(admin.storage(), `storage/exemple.txt`))));

  await registerTest("Try to list folders in storage with not authenticated user, it should fail", () => assertFails(listAll(ref(storage, "storage"))));
  await registerTest("Try to list folders in storage with authenticated user admin gsbenevides2, it should success", () => assertSucceeds(listAll(ref(admin.storage(), "storage"))));
  await registerTest("Try to list folders in storage with authenticated user notAdminUser, it should fail", () => assertFails(listAll(ref(notAdminUser.storage(), "storage"))));

  await registerTest("Try to save a file with not authenticated user, it should fail (file not public)", () => assertFails(uploadString(ref(storage, `storage/${nomPublicFile.id}/file.txt`), "Hello World!")));
  await registerTest("Try to save a file with authenticated user admin gsbenevides2, it should success (file not public)", () => assertSucceeds(uploadString(ref(admin.storage(), `storage/${nomPublicFile.id}/file.txt`), "Hello World!")));
  await registerTest("Try to save a file with authenticated user notAdminUser, it should fail (file not public)", () => assertFails(uploadString(ref(notAdminUser.storage(), `storage/${nomPublicFile.id}/file.txt`), "Hello World!")));

  await registerTest("Try to save a file with not authenticated user, it should fail (file restricted)", () => assertFails(uploadString(ref(storage, `storage/${restrictedFile.id}/file.txt`), "Hello World!")));
  await registerTest("Try to save a file with authenticated user notAdminUser, it should fail (file restricted)", () => assertFails(uploadString(ref(notAdminUser.storage(), `storage/${restrictedFile.id}/file.txt`), "Hello World!")));
  await registerTest("Try to save a file with authenticated user admin gsbenevides2, it should success (file restricted)", () => assertSucceeds(uploadString(ref(admin.storage(), `storage/${restrictedFile.id}/file.txt`), "Hello World!")));

  await registerTest("Try to save a file with authenticated user notAdminUser, it should fail (file public)", () => assertFails(uploadString(ref(notAdminUser.storage(), `storage/${publicFile.id}/file.txt`), "Hello World!")));
  await registerTest("Try to save a file with authenticated user admin gsbenevides2, it should success (file public)", () => assertSucceeds(uploadString(ref(admin.storage(), `storage/${publicFile.id}/file.txt`), "Hello World!")));
  await registerTest("Try to save a file with not authenticated user, it should fail (file public)", () => assertFails(uploadString(ref(storage, `storage/${publicFile.id}/file.txt`), "Hello World!")));

  await registerTest("Try to read a file with not authenticated user, it should fail (file restricted)", () => assertFails(getBytes(ref(storage, `storage/${restrictedFile.id}/file.txt`))));
  await registerTest("Try to read a file with authenticated user notAdminUser, it should success (file restricted)", () => assertSucceeds(getBytes(ref(notAdminUser.storage(), `storage/${restrictedFile.id}/file.txt`))));
  await registerTest("Try to read a file with authenticated user admin gsbenevides2, it should success (file restricted)", () => assertSucceeds(getBytes(ref(admin.storage(), `storage/${restrictedFile.id}/file.txt`))));

  await registerTest("Try to read a file with not authenticated user in the public, it should success (file public)", () => assertSucceeds(getBytes(ref(storage, `storage/${publicFile.id}/file.txt`))));
  await registerTest("Try to read a file with authenticated user notAdminUser in the public, it should success (file public)", () => assertSucceeds(getBytes(ref(notAdminUser.storage(), `storage/${publicFile.id}/file.txt`))));
  await registerTest("Try to read a file with authenticated user admin gsbenevides2 in the public, it should success (file public)", () => assertSucceeds(getBytes(ref(admin.storage(), `storage/${publicFile.id}/file.txt`))));

  await registerTest("Try to read a file with not authenticated user, it should fail (file not public)", () => assertFails(uploadString(ref(storage, `storage/${publicFile.id}/file.txt`), "Hello World!")));
  await registerTest("Try to read a file with authenticated user notAdminUser, it should fail (file not public)", () => assertFails(uploadString(ref(notAdminUser.storage(), `storage/${publicFile.id}/file.txt`), "Hello World!")));
  await registerTest("Try to read a file with authenticated user admin gsbenevides2, it should success (file not public)", () => assertSucceeds(uploadString(ref(admin.storage(), `storage/${publicFile.id}/file.txt`), "Hello World!")));
  dispatchLog("success", "All tests passed for storage files rules");
}
