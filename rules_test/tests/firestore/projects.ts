import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { dispatchLog, registerTest } from "../../utils";

export async function runTestsForProjects(firestore: Firestore, testEnv: RulesTestEnvironment) {
  dispatchLog("info", "Running tests for projects collection");
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });
  const projectsCollectionForNotAdmin = collection(notAdminUser.firestore(), "projects");
  const projectsCollectionForAdmin = collection(admin.firestore(), "projects");
  const projectsCollection = collection(firestore, "projects");

  await registerTest("Try to write a document to the projects collection with not authenticated user, it should fail", () => assertFails(addDoc(projectsCollection, { name: "test" })));

  await registerTest("Try to write a document to the projects collection with authenticated user admin gsbenevides2, it should succeed", () => assertSucceeds(addDoc(projectsCollectionForAdmin, { name: "test" })));

  await registerTest("Try to write a document to the projects collection with authenticated user notAdminUser, it should fail", () => assertFails(addDoc(projectsCollectionForNotAdmin, { name: "test" })));

  // Write a project for other tests
  const projectId = "projectId";
  await setDoc(doc(projectsCollectionForAdmin, projectId), { name: "test" });

  await registerTest("Try to read a document from the projects collection with not authenticated user, it should succeed", () => assertSucceeds(getDoc(doc(projectsCollection, projectId))));

  await registerTest("Try to read a document from the projects collection with authenticated user admin gsbenevides2, it should succeed", () => assertSucceeds(getDoc(doc(projectsCollectionForAdmin, projectId))));

  await registerTest("Try to read a document from the projects collection with authenticated user notAdminUser, it should fail", () => assertSucceeds(getDoc(doc(projectsCollectionForNotAdmin, projectId))));

  dispatchLog("success", "All tests for projects collection passed");
}
