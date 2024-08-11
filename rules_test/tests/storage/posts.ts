import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection } from "firebase/firestore";
import { FirebaseStorage, getBytes, listAll, ref, uploadString } from "firebase/storage";
import { registerTest } from "../../utils";

export default async function runPostsStorageTests(storage: FirebaseStorage, testEnv: RulesTestEnvironment, firestore: Firestore) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });

  const postsCollection = collection(admin.firestore(), "posts");
  const exemplePostNotPublished = await addDoc(postsCollection, {
    title: "Post title",
    visible: false,
  });
  const exemplePostPublished = await addDoc(postsCollection, {
    title: "Post title",
    visible: true,
  });

  await uploadString(ref(admin.storage(), `posts/${exemplePostNotPublished.id}/teste.txt`), "Hello World!");
  await uploadString(ref(admin.storage(), `posts/${exemplePostPublished.id}/teste.txt`), "Hello World!");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await registerTest("Try to list folders in posts with not authenticated user, it should fail", () => assertFails(listAll(ref(storage, "posts"))));
  await registerTest("Try to list folders in posts with authenticated user admin gsbenevides2, it should success", () => assertSucceeds(listAll(ref(admin.storage(), "posts"))));
  await registerTest("Try to list folders in posts with authenticated user notAdminUser, it should fail", () => assertFails(listAll(ref(notAdminUser.storage(), "posts"))));

  await registerTest("Try to save a file with not authenticated user, it should fail (post not published)", () => assertFails(uploadString(ref(storage, `posts/${exemplePostNotPublished.id}/teste.txt`), "Hello World!")));
  await registerTest("Try to save a file with authenticated user admin gsbenevides2, it should success (post not published)", () => assertSucceeds(uploadString(ref(admin.storage(), `posts/${exemplePostNotPublished.id}/teste.txt`), "Hello World!")));
  await registerTest("Try to save a file with authenticated user notAdminUser, it should fail (post not published)", () => assertFails(uploadString(ref(notAdminUser.storage(), `posts/${exemplePostNotPublished.id}/teste.txt`), "Hello World!")));
  await registerTest("Try to save a file with authenticated user notAdminUser, it should fail (post published)", () => assertFails(uploadString(ref(notAdminUser.storage(), `posts/${exemplePostPublished.id}/teste.txt`), "Hello World!")));
  await registerTest("Try to save a file with authenticated user admin gsbenevides2, it should success (post published)", () => assertSucceeds(uploadString(ref(admin.storage(), `posts/${exemplePostPublished.id}/teste.txt`), "Hello World!")));
  await registerTest("Try to save a file with not authenticated user, it should fail (post published)", () => assertFails(uploadString(ref(storage, `posts/${exemplePostPublished.id}/teste.txt`), "Hello World!")));

  await registerTest("Try to read a file with authenticated user notAdminUser, it should fail (post not published)", () => assertFails(getBytes(ref(notAdminUser.storage(), `posts/${exemplePostNotPublished.id}/teste.txt`))));
  await registerTest("Try to read a file with authenticated user admin gsbenevides2, it should success (post not published)", () => assertSucceeds(getBytes(ref(admin.storage(), `posts/${exemplePostNotPublished.id}/teste.txt`))));
  await registerTest("Try to read a file with not authenticated user, it should fail (post not published)", () => assertFails(getBytes(ref(storage, `posts/${exemplePostNotPublished.id}/teste.txt`))));

  await registerTest("Try to read a file with authenticated user notAdminUser, it should success (post published)", () => assertSucceeds(getBytes(ref(notAdminUser.storage(), `posts/${exemplePostPublished.id}/teste.txt`))));
  await registerTest("Try to read a file with authenticated user admin gsbenevides2, it should success (post published)", () => assertSucceeds(getBytes(ref(admin.storage(), `posts/${exemplePostPublished.id}/teste.txt`))));
  await registerTest("Try to read a file with not authenticated user, it should success (post published)", () => assertSucceeds(getBytes(ref(storage, `posts/${exemplePostPublished.id}/teste.txt`))));
}
