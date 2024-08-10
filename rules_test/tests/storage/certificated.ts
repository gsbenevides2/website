import { RulesTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { FirebaseStorage, listAll, ref } from "firebase/storage";

export default async function runCretificatesTests(storage: FirebaseStorage, testEnv: RulesTestEnvironment) {
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const notAdminUser = testEnv.authenticatedContext("notAdminUser", {
    email: "notAdmin@gmail.com",
  });

  const fileString = "Hello World!";

  console.debug("Try to read certificates with not authenticated user, it should fail");
  await assertFails(listAll(ref(storage, "certificates")));
  console.debug("Try to read certificates with authenticated user admin gsbenevides2, it should success");
  await assertSucceeds(listAll(ref(admin.storage(), "certificates")));
  console.debug("Try to read certificates with authenticated user notAdminUser, it should fail");
  await assertFails(listAll(ref(notAdminUser.storage(), "certificates")));
}
