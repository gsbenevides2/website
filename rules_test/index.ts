import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import fs from "fs";
import path from "path";
import { runTestsForCertifications } from "./tests/firestore/certifications";
import { runTestsForLinks } from "./tests/firestore/links";
import { runTestsForPosts } from "./tests/firestore/posts";
import { runTestsForProjects } from "./tests/firestore/projects";
import { runTestsForStorage } from "./tests/firestore/storage";
const firestoreRulesPath = path.resolve(__dirname, "..", "firestore.rules");

async function start() {
  let testEnv = await initializeTestEnvironment({
    projectId: "gui-dev-br",
    firestore: {
      rules: fs.readFileSync(firestoreRulesPath, "utf8"),
      host: "localhost",
      port: 8080,
    },
  });

  initializeApp({
    projectId: "gui-dev-br",
  });
  // Firestore Rules Tests with Emulator
  const firestore = getFirestore();
  connectFirestoreEmulator(firestore, "localhost", 8080);
  await runTestsForCertifications(firestore, testEnv);
  await runTestsForProjects(firestore, testEnv);
  await runTestsForLinks(firestore, testEnv);
  await runTestsForPosts(firestore, testEnv);
  await runTestsForStorage(firestore, testEnv);
  await testEnv.clearFirestore();
  process.exit(0);
}
start();
