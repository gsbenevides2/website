import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";
import { runTestsForCertifications } from "./certifications";
import { runTestsForCMS } from "./cms";
import { runTestsForLinks } from "./links";
import { runTestsForPosts } from "./posts";
import { runTestsForProjects } from "./projects";
import { runTestsForStorage } from "./storage";

export async function runFirestoreTests(firestore: Firestore, testEnv: RulesTestEnvironment) {
  await runTestsForCertifications(firestore, testEnv);
  await runTestsForProjects(firestore, testEnv);
  await runTestsForLinks(firestore, testEnv);
  await runTestsForPosts(firestore, testEnv);
  await runTestsForStorage(firestore, testEnv);
  await runTestsForCMS(firestore, testEnv);
}
