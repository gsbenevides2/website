import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function runTestsForPosts(firestore: Firestore, testEnv: RulesTestEnvironment) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const postsCollectionForNotAdmin = collection(notAdminUser.firestore(), "posts");
  const postsCollectionForAdmin = collection(admin.firestore(), "posts");
  const postsCollection = collection(firestore, "posts");

  console.debug("Try to write a document to the posts collection with not authenticated user, it should fail");
  await assertFails(addDoc(postsCollection, { name: "test", visible: true }));

  console.debug("Try to write a document to the posts collection with authenticated user admin gsbenevides2, it should succeed");
  await assertSucceeds(addDoc(postsCollectionForAdmin, { name: "test", visible: true }));

  console.debug("Try to write a document to the posts collection with authenticated user notAdminUser, it should fail");
  await assertFails(addDoc(postsCollectionForNotAdmin, { name: "test", visible: true }));

  // Write a visible post for other tests
  const visiblePostId = "visiblePostId";
  await setDoc(doc(postsCollectionForAdmin, visiblePostId), { name: "test", visible: true });

  // Write a hidden post for other tests
  const hiddenPostId = "hiddenPostId";
  await setDoc(doc(postsCollectionForAdmin, hiddenPostId), { name: "test", visible: false });

  console.debug("Try to read a visible document from the posts collection with not authenticated user, it should succeed");
  await assertSucceeds(getDoc(doc(postsCollection, visiblePostId)));

  console.debug("Try to read a hidden document from the posts collection with not authenticated user, it should fail");
  await assertFails(getDoc(doc(postsCollection, hiddenPostId)));

  console.debug("Try to read a visible document from the posts collection with authenticated user admin gsbenevides2, it should succeed");
  await assertSucceeds(getDoc(doc(postsCollectionForAdmin, visiblePostId)));

  console.debug("Try to read a hidden document from the posts collection with authenticated user admin gsbenevides2, it should succeed");
  await assertSucceeds(getDoc(doc(postsCollectionForAdmin, hiddenPostId)));

  console.debug("Try to read a visible document from the posts collection with authenticated user notAdminUser, it should succeed");
  await assertSucceeds(getDoc(doc(postsCollectionForNotAdmin, visiblePostId)));

  console.debug("Try to read a hidden document from the posts collection with authenticated user notAdminUser, it should fail");
  await assertFails(getDoc(doc(postsCollectionForNotAdmin, hiddenPostId)));
}
