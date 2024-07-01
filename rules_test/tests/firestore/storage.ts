import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

export async function runTestsForStorage(firestore: Firestore, testEnv: RulesTestEnvironment) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const anotherUser = testEnv.authenticatedContext("anotherUser", {
    email: "anotherUser@gmail.com",
  });

  const storageCollectionForNotAdmin = collection(notAdminUser.firestore(), "storage");
  const storageCollectionForAdmin = collection(admin.firestore(), "storage");
  const storageCollectionForAnotherUser = collection(anotherUser.firestore(), "storage");
  const storageCollection = collection(firestore, "storage");

  console.debug("Try to write a document to the storage collection as an unauthenticated user, it should fail");
  await assertFails(addDoc(storageCollection, { name: "test", visible: true }));

  console.debug("Try to write a document to the storage collection as an authenticated admin user gsbenevides2, it should succeed");
  await assertSucceeds(addDoc(storageCollectionForAdmin, { name: "test", visible: true }));

  console.debug("Try to write a document to the storage collection as an authenticated non-admin user, it should fail");
  await assertFails(addDoc(storageCollectionForNotAdmin, { name: "test", visible: true }));

  // Write a visible storage document for other tests
  const visibleStorageId = "visibleStorageId";
  await setDoc(doc(storageCollectionForAdmin, visibleStorageId), { name: "test", visible: true });

  // Write a hidden storage document for other tests with allowed users
  const hiddenStorageId = "hiddenStorageId";
  await setDoc(doc(storageCollectionForAdmin, hiddenStorageId), { name: "test", visible: false, allowedUsers: ["notAdmin@gmail.com"] });

  console.debug("Try to read a visible document from the storage collection as an unauthenticated user, it should succeed");
  await assertSucceeds(getDoc(doc(storageCollection, visibleStorageId)));

  console.debug("Try to read a hidden document from the storage collection as an unauthenticated user, it should fail");
  await assertFails(getDoc(doc(storageCollection, hiddenStorageId)));

  console.debug("Try to read a visible document from the storage collection as an authenticated admin user gsbenevides2, it should succeed");
  await assertSucceeds(getDoc(doc(storageCollectionForAdmin, visibleStorageId)));

  console.debug("Try to read a hidden document from the storage collection as an authenticated admin user gsbenevides2, it should succeed");
  await assertSucceeds(getDoc(doc(storageCollectionForAdmin, hiddenStorageId)));

  console.debug("Try to read a visible document from the storage collection as an authenticated non-admin user, it should succeed");
  await assertSucceeds(getDoc(doc(storageCollectionForNotAdmin, visibleStorageId)));

  console.debug("Try to read a hidden document from the storage collection as an authenticated non-admin user who is allowed, it should succeed");
  await assertSucceeds(getDoc(doc(storageCollectionForNotAdmin, hiddenStorageId)));

  console.debug("Try to read a hidden document from the storage collection as an authenticated non-admin user who is not allowed, it should fail");
  await assertFails(getDoc(doc(storageCollectionForAnotherUser, hiddenStorageId)));

  console.debug("Try to list documents from the storage collection as an unauthenticated user, it should fail");
  await assertFails(getDocs(storageCollection));

  console.debug("Try to list documents from the storage collection as an authenticated admin user gsbenevides2, it should succeed");
  await assertSucceeds(getDocs(storageCollectionForAdmin));

  console.debug("Try to list documents from the storage collection as an authenticated non-admin user, it should fail");
  await assertFails(getDocs(storageCollectionForNotAdmin));

  console.debug("Try to list documents from the storage collection as an authenticated non-admin user who is allowed, it should fail");
  await assertFails(getDocs(query(storageCollectionForNotAdmin, where("allowedUsers", "array-contains", "notAdmin@gmail.com"))));

  console.debug("Try to list documents from the storage collection as an authenticated non-admin user, and filter by visible, it should fail");
  await assertFails(getDocs(query(storageCollectionForNotAdmin, where("visible", "==", true))));
}
