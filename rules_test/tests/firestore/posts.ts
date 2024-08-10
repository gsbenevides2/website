import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { dispatchLog, registerTest } from "../../utils";

export async function runTestsForPosts(firestore: Firestore, testEnv: RulesTestEnvironment) {
  dispatchLog("info", "Running tests for posts collection");
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const postsCollectionForNotAdmin = collection(notAdminUser.firestore(), "posts");
  const postsCollectionForAdmin = collection(admin.firestore(), "posts");
  const postsCollection = collection(firestore, "posts");

  await registerTest("Try to write a document to the posts collection with not authenticated user, it should fail", () => assertFails(addDoc(postsCollection, { name: "test", visible: true })));

  await registerTest("Try to write a document to the posts collection with authenticated user admin gsbenevides2, it should succeed", () => assertSucceeds(addDoc(postsCollectionForAdmin, { name: "test", visible: true })));

  await registerTest("Try to write a document to the posts collection with authenticated user notAdminUser, it should fail", () => assertFails(addDoc(postsCollectionForNotAdmin, { name: "test", visible: true })));

  // Write a visible post for other tests
  const visiblePostId = "visiblePostId";
  await setDoc(doc(postsCollectionForAdmin, visiblePostId), { name: "test", visible: true });

  // Write a hidden post for other tests
  const hiddenPostId = "hiddenPostId";
  await setDoc(doc(postsCollectionForAdmin, hiddenPostId), { name: "test", visible: false });

  await registerTest("Try to read a visible document from the posts collection with not authenticated user, it should succeed", () => assertSucceeds(getDoc(doc(postsCollection, visiblePostId))));

  await registerTest("Try to read a hidden document from the posts collection with not authenticated user, it should fail", () => assertFails(getDoc(doc(postsCollection, hiddenPostId))));

  await registerTest("Try to read a visible document from the posts collection with authenticated user admin gsbenevides2, it should succeed", () => assertSucceeds(getDoc(doc(postsCollectionForAdmin, visiblePostId))));

  await registerTest("Try to read a hidden document from the posts collection with authenticated user admin gsbenevides2, it should succeed", () => assertSucceeds(getDoc(doc(postsCollectionForAdmin, hiddenPostId))));

  await registerTest("Try to read a visible document from the posts collection with authenticated user notAdminUser, it should succeed", () => assertSucceeds(getDoc(doc(postsCollectionForNotAdmin, visiblePostId))));

  await registerTest("Try to read a hidden document from the posts collection with authenticated user notAdminUser, it should fail", () => assertFails(getDoc(doc(postsCollectionForNotAdmin, hiddenPostId))));

  dispatchLog("success", "All tests for posts collection passed");
}
