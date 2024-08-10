import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { FirebaseStorage } from "firebase/storage";
import minimalSecury from "./readAnyDirectory";

export default async function runStorageTests(storage: FirebaseStorage, testEnv: RulesTestEnvironment) {
  await minimalSecury(storage, testEnv);
}
