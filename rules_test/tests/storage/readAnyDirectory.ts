import { RulesTestEnvironment, assertFails } from "@firebase/rules-unit-testing";
import { FirebaseStorage, listAll, ref, uploadString } from "firebase/storage";
import { registerTest } from "../../utils";

export default async function minimalSecury(storage: FirebaseStorage, testEnv: RulesTestEnvironment) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });

  const fileString = "Hello World!";

  await registerTest("Try to read any directory with not authenticated user, it should fail", () => assertFails(listAll(ref(storage, "any/directory"))));
  await registerTest("Try to read any directory with authenticated user admin gsbenevides2, it should fail", () => assertFails(listAll(ref(admin.storage(), "any/directory"))));
  await registerTest("Try to read any directory with authenticated user notAdminUser, it should fail", () => assertFails(listAll(ref(notAdminUser.storage(), "any/directory"))));

  await registerTest("Try to save a file with not authenticated user, it should fail", () => assertFails(uploadString(ref(storage, "any/directory/exemple.txt"), fileString)));
  await registerTest("Try to save a file with authenticated user admin gsbenevides2, it should fail", () => assertFails(uploadString(ref(admin.storage(), "any/directory/exemple.txt"), fileString)));
  await registerTest("Try to save a file with authenticated user notAdminUser, it should fail", () => assertFails(uploadString(ref(notAdminUser.storage(), "any/directory/exemple.txt"), fileString)));
}
