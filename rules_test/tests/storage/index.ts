import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { FirebaseStorage } from "firebase/storage";
import runCretificatesTests from "./certificates";
import runProjectsTests from "./projects";
import minimalSecury from "./readAnyDirectory";

export default async function runStorageTests(storage: FirebaseStorage, testEnv: RulesTestEnvironment) {
  await minimalSecury(storage, testEnv);
  await runCretificatesTests(storage, testEnv);
  await runProjectsTests(storage, testEnv);
}
