import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function runTestsForLinks(firestore: Firestore, testEnv: RulesTestEnvironment) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const linksCollectionForNotAdmin = collection(notAdminUser.firestore(), "links");
  const linksCollectionForAdmin = collection(admin.firestore(), "links");
  const linksCollection = collection(firestore, "links");

  console.debug("Try to write a document to the links collection with not authenticated user, it should fail");
  await assertFails(addDoc(linksCollection, { name: "test" }));

  console.debug("Try to write a document to the links collection with authenticated user admin gsbenevides2, it should succeed");
  await assertSucceeds(addDoc(linksCollectionForAdmin, { name: "test" }));

  console.debug("Try to write a document to the links collection with authenticated user notAdminUser, it should fail");
  await assertFails(addDoc(linksCollectionForNotAdmin, { name: "test" }));

  // Write a link for other tests
  const linkId = "linkId";
  await setDoc(doc(linksCollectionForAdmin, linkId), { name: "test" });

  console.debug("Try to read a document from the links collection with not authenticated user, it should succeed");
  await assertSucceeds(getDoc(doc(linksCollection, linkId)));

  console.debug("Try to read a document from the links collection with authenticated user admin gsbenevides2, it should succeed");
  await assertSucceeds(getDoc(doc(linksCollectionForAdmin, linkId)));

  console.debug("Try to read a document from the links collection with authenticated user notAdminUser, it should fail");
  await assertSucceeds(getDoc(doc(linksCollectionForNotAdmin, linkId)));
}
