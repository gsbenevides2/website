import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { dispatchLog, registerTest } from "../../utils";

export async function runTestsForLinks(firestore: Firestore, testEnv: RulesTestEnvironment) {
  dispatchLog("info", "Running tests for links collection");
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const linksCollectionForNotAdmin = collection(notAdminUser.firestore(), "links");
  const linksCollectionForAdmin = collection(admin.firestore(), "links");
  const linksCollection = collection(firestore, "links");

  await registerTest("Try to write a document to the links collection with not authenticated user, it should fail", () => assertFails(addDoc(linksCollection, { name: "test" })));

  await registerTest("Try to write a document to the links collection with authenticated user admin gsbenevides2, it should succeed", () => assertSucceeds(addDoc(linksCollectionForAdmin, { name: "test" })));

  await registerTest("Try to write a document to the links collection with authenticated user notAdminUser, it should fail", () => assertFails(addDoc(linksCollectionForNotAdmin, { name: "test" })));

  // Write a link for other tests
  const linkId = "linkId";
  await setDoc(doc(linksCollectionForAdmin, linkId), { name: "test" });

  await registerTest("Try to read a document from the links collection with not authenticated user, it should succeed", () => assertSucceeds(getDoc(doc(linksCollection, linkId))));

  await registerTest("Try to read a document from the links collection with authenticated user admin gsbenevides2, it should succeed", () => assertSucceeds(getDoc(doc(linksCollectionForAdmin, linkId))));

  await registerTest("Try to read a document from the links collection with authenticated user notAdminUser, it should fail", () => assertSucceeds(getDoc(doc(linksCollectionForNotAdmin, linkId))));

  dispatchLog("success", "All tests for links collection passed");
}
