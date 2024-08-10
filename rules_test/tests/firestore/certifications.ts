import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { dispatchLog, registerTest } from "../../utils";

export async function runTestsForCertifications(firestore: Firestore, testEnv: RulesTestEnvironment) {
  dispatchLog("info", "Running tests for certifications collection");
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const certificationsCollectionForNotAdmin = collection(notAdminUser.firestore(), "certifications");
  const certificationsCollectionForAdmin = collection(admin.firestore(), "certifications");
  const certificationsCollection = collection(firestore, "certifications");

  await registerTest("Try to write a document to the certifications collection with not authenticated user, it should fail", () => assertFails(addDoc(certificationsCollection, { name: "test" })));

  await registerTest("Try to write a document to the certifications collection with authenticated user admin gsbenevides2, it should succeed", () => assertSucceeds(addDoc(certificationsCollectionForAdmin, { name: "test" })));

  await registerTest("Try to write a document to the certifications collection with authenticated user notAdminUser, it should fail", () => assertFails(addDoc(certificationsCollectionForNotAdmin, { name: "test" })));

  // Write a certification for other tests
  const certId = "certId";
  await setDoc(doc(certificationsCollectionForAdmin, certId), { name: "test" });

  await registerTest("Try to read a document from the certifications collection with not authenticated user, it should succeed", () => assertSucceeds(getDoc(doc(certificationsCollection, certId))));

  await registerTest("Try to read a document from the certifications collection with authenticated user admin gsbenevides2, it should succeed", () => assertSucceeds(getDoc(doc(certificationsCollectionForAdmin, certId))));

  await registerTest("Try to read a document from the certifications collection with authenticated user notAdminUser, it should fail", () => assertSucceeds(getDoc(doc(certificationsCollectionForNotAdmin, certId))));

  dispatchLog("success", "All tests for certifications collection passed");
}
