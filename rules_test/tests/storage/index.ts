import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import runCretificatesTests from "./certificates";
import runPostsStorageTests from "./posts";
import runProjectsTests from "./projects";
import minimalSecury from "./readAnyDirectory";
import runStorageFilesTests from "./storage";

export default async function runStorageTests(storage: FirebaseStorage, testEnv: RulesTestEnvironment, firestore: Firestore) {
  await minimalSecury(storage, testEnv);
  await runCretificatesTests(storage, testEnv);
  await runProjectsTests(storage, testEnv);
  await runPostsStorageTests(storage, testEnv, firestore);
  await runStorageFilesTests(storage, testEnv, firestore);
}
