import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { FirebaseStorage, listAll, ref, uploadString } from "firebase/storage";
import { dispatchLog, registerTest } from "../../utils";

export default async function runCretificatesTests(storage: FirebaseStorage, testEnv: RulesTestEnvironment) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });

  const fileString = "Hello World!";
  dispatchLog("info", "Starting tests for certificates storage rules");
  await registerTest("Try to read certificates with not authenticated user, it should success", () => assertSucceeds(listAll(ref(storage, "certifications"))));
  await registerTest("Try to read certificates with authenticated user admin gsbenevides2, it should success", () => assertSucceeds(listAll(ref(admin.storage(), "certifications"))));
  await registerTest("Try to read certificates with authenticated user notAdminUser, it should fail", () => assertSucceeds(listAll(ref(notAdminUser.storage(), "certifications"))));

  await registerTest("Try to save a file with not authenticated user, it should fail", () => assertFails(uploadString(ref(storage, "certifications/exemple.txt"), fileString)));
  await registerTest("Try to save a file with authenticated user admin gsbenevides2, it should success", () => assertSucceeds(uploadString(ref(admin.storage(), "certifications/exemple.txt"), fileString)));
  await registerTest("Try to save a file with authenticated user notAdminUser, it should fail", () => assertFails(uploadString(ref(notAdminUser.storage(), "certifications/exemple.txt"), fileString)));
  dispatchLog("success", "All tests passed for certificates storage rules");
}
