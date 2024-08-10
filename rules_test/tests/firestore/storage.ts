import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { dispatchLog, registerTest } from "../../utils";

export async function runTestsForStorage(firestore: Firestore, testEnv: RulesTestEnvironment) {
  dispatchLog("info", "Running tests for storage collection");
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

  await registerTest("Try to write a document to the storage collection as an unauthenticated user, it should fail", () => assertFails(addDoc(storageCollection, { name: "test", visible: true })));

  await registerTest("Try to write a document to the storage collection as an authenticated admin user gsbenevides2, it should succeed", () => assertSucceeds(addDoc(storageCollectionForAdmin, { name: "test", visible: true })));

  await registerTest("Try to write a document to the storage collection as an authenticated non-admin user, it should fail", () => assertFails(addDoc(storageCollectionForNotAdmin, { name: "test", visible: true })));

  // Write a visible storage document for other tests
  const visibleStorageId = "visibleStorageId";
  await setDoc(doc(storageCollectionForAdmin, visibleStorageId), { name: "test", visible: true });

  // Write a hidden storage document for other tests with allowed users
  const hiddenStorageId = "hiddenStorageId";
  await setDoc(doc(storageCollectionForAdmin, hiddenStorageId), { name: "test", visible: false, allowedUsers: ["notAdmin@gmail.com"] });

  await registerTest("Try to read a visible document from the storage collection as an unauthenticated user, it should succeed", () => assertSucceeds(getDoc(doc(storageCollection, visibleStorageId))));

  await registerTest("Try to read a hidden document from the storage collection as an unauthenticated user, it should fail", () => assertFails(getDoc(doc(storageCollection, hiddenStorageId))));

  await registerTest("Try to read a visible document from the storage collection as an authenticated admin user gsbenevides2, it should succeed", () => assertSucceeds(getDoc(doc(storageCollectionForAdmin, visibleStorageId))));

  await registerTest("Try to read a hidden document from the storage collection as an authenticated admin user gsbenevides2, it should succeed", () => assertSucceeds(getDoc(doc(storageCollectionForAdmin, hiddenStorageId))));

  await registerTest("Try to read a visible document from the storage collection as an authenticated non-admin user, it should succeed", () => assertSucceeds(getDoc(doc(storageCollectionForNotAdmin, visibleStorageId))));

  await registerTest("Try to read a hidden document from the storage collection as an authenticated non-admin user who is allowed, it should succeed", () => assertSucceeds(getDoc(doc(storageCollectionForNotAdmin, hiddenStorageId))));

  await registerTest("Try to read a hidden document from the storage collection as an authenticated non-admin user who is not allowed, it should fail", () => assertFails(getDoc(doc(storageCollectionForAnotherUser, hiddenStorageId))));

  await registerTest("Try to list documents from the storage collection as an unauthenticated user, it should fail", () => assertFails(getDocs(storageCollection)));

  await registerTest("Try to list documents from the storage collection as an authenticated admin user gsbenevides2, it should succeed", () => assertSucceeds(getDocs(storageCollectionForAdmin)));

  await registerTest("Try to list documents from the storage collection as an authenticated non-admin user, it should fail", () => assertFails(getDocs(storageCollectionForNotAdmin)));

  await registerTest("Try to list documents from the storage collection as an authenticated non-admin user who is allowed, it should fail", () => assertFails(getDocs(query(storageCollectionForNotAdmin, where("allowedUsers", "array-contains", "notAdmin@gmail.com")))));

  await registerTest("Try to list documents from the storage collection as an authenticated non-admin user, and filter by visible, it should fail", () => assertFails(getDocs(query(storageCollectionForNotAdmin, where("visible", "==", true)))));

  dispatchLog("success", "All tests for storage collection passed");
}
