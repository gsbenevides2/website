import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { FirebaseStorage, listAll, ref, uploadString } from "firebase/storage";
import { dispatchLog, registerTest } from "../../utils";

export default async function runProjectsTests(storage: FirebaseStorage, testEnv: RulesTestEnvironment) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });

  const fileString = "Hello World!";
  dispatchLog("info", "Starting tests for projects storage rules");
  await registerTest("Try to read projects with not authenticated user, it should success", () => assertSucceeds(listAll(ref(storage, "projects"))));
  await registerTest("Try to read projects with authenticated user admin gsbenevides2, it should success", () => assertSucceeds(listAll(ref(admin.storage(), "projects"))));
  await registerTest("Try to read projects with authenticated user notAdminUser, it should fail", () => assertSucceeds(listAll(ref(notAdminUser.storage(), "projects"))));

  await registerTest("Try to save a file with not authenticated user, it should fail", () => assertFails(uploadString(ref(storage, "projects/exemple.txt"), fileString)));
  await registerTest("Try to save a file with authenticated user admin gsbenevides2, it should success", () => assertSucceeds(uploadString(ref(admin.storage(), "projects/exemple.txt"), fileString)));
  await registerTest("Try to save a file with authenticated user notAdminUser, it should fail", () => assertFails(uploadString(ref(notAdminUser.storage(), "projects/exemple.txt"), fileString)));
  dispatchLog("success", "All tests passed for projects storage rules");
}
