import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function runTestsForProjects(firestore: Firestore, testEnv: RulesTestEnvironment) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const projectsCollectionForNotAdmin = collection(notAdminUser.firestore(), "projects");
  const projectsCollectionForAdmin = collection(admin.firestore(), "projects");
  const projectsCollection = collection(firestore, "projects");

  console.debug("Try to write a document to the projects collection with not authenticated user, it should fail");
  await assertFails(addDoc(projectsCollection, { name: "test" }));

  console.debug("Try to write a document to the projects collection with authenticated user admin gsbenevides2, it should succeed");
  await assertSucceeds(addDoc(projectsCollectionForAdmin, { name: "test" }));

  console.debug("Try to write a document to the projects collection with authenticated user notAdminUser, it should fail");
  await assertFails(addDoc(projectsCollectionForNotAdmin, { name: "test" }));

  // Write a project for other tests
  const projectId = "projectId";
  await setDoc(doc(projectsCollectionForAdmin, projectId), { name: "test" });

  console.debug("Try to read a document from the projects collection with not authenticated user, it should succeed");
  await assertSucceeds(getDoc(doc(projectsCollection, projectId)));

  console.debug("Try to read a document from the projects collection with authenticated user admin gsbenevides2, it should succeed");
  await assertSucceeds(getDoc(doc(projectsCollectionForAdmin, projectId)));

  console.debug("Try to read a document from the projects collection with authenticated user notAdminUser, it should fail");
  await assertSucceeds(getDoc(doc(projectsCollectionForNotAdmin, projectId)));
}
