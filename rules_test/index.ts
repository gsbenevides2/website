import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import fs from "fs";
import path from "path";
import { runFirestoreTests } from "./tests/firestore";
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
  await runFirestoreTests(firestore, testEnv);
  await testEnv.clearFirestore();
  process.exit(0);
}
start();
