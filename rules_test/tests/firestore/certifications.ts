import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function runTestsForCertifications(firestore: Firestore, testEnv: RulesTestEnvironment) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const certificationsCollectionForNotAdmin = collection(notAdminUser.firestore(), "certifications");
  const certificationsCollectionForAdmin = collection(admin.firestore(), "certifications");
  const certificationsCollection = collection(firestore, "certifications");

  console.debug("Try to write a document to the certifications collection with not authenticated user, it should fail");
  await assertFails(addDoc(certificationsCollection, { name: "test" }));

  console.debug("Try to write a document to the certifications collection with authenticated user admin gsbenevides2, it should succeed");
  await assertSucceeds(addDoc(certificationsCollectionForAdmin, { name: "test" }));

  console.debug("Try to write a document to the certifications collection with authenticated user notAdminUser, it should fail");
  await assertFails(addDoc(certificationsCollectionForNotAdmin, { name: "test" }));

  // Write a certification for other tests
  const certId = "certId";
  await setDoc(doc(certificationsCollectionForAdmin, certId), { name: "test" });

  console.debug("Try to read a document from the certifications collection with not authenticated user, it should succeed");
  await assertSucceeds(getDoc(doc(certificationsCollection, certId)));

  console.debug("Try to read a document from the certifications collection with authenticated user admin gsbenevides2, it should succeed");
  await assertSucceeds(getDoc(doc(certificationsCollectionForAdmin, certId)));

  console.debug("Try to read a document from the certifications collection with authenticated user notAdminUser, it should fail");
  await assertSucceeds(getDoc(doc(certificationsCollectionForNotAdmin, certId)));
}
