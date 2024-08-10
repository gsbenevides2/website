import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore, setLogLevel } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import fs from "fs";
import path from "path";
import { runFirestoreTests } from "./tests/firestore";
import runStorageTests from "./tests/storage";
import { dispatchLog } from "./utils";

const firestoreRulesPath = path.resolve(__dirname, "..", "firestore.rules");
const host = process.env.EMULATOR_HOST || "localhost";

async function start() {
  dispatchLog("info", "Starting Firebase Test Environment and Initialize Enviroment...");
  let testEnv = await initializeTestEnvironment({
    projectId: "gui-dev-br",
    firestore: {
      rules: fs.readFileSync(firestoreRulesPath, "utf8"),
      host,
      port: 8080,
    },
    storage: {
      rules: fs.readFileSync(path.resolve(__dirname, "..", "storage.rules"), "utf8"),
      host,
      port: 9199,
    },
  });

  initializeApp({
    projectId: "gui-dev-br",
    storageBucket: "gui-dev-br.appspot.com",
  });

  dispatchLog("success", "Firebase Test Environment Started");
  dispatchLog("info", "Initializing Firestore Tests");

  const firestore = getFirestore();
  setLogLevel("silent");

  connectFirestoreEmulator(firestore, host, 8080);
  await runFirestoreTests(firestore, testEnv);
  //await testEnv.clearFirestore();
  dispatchLog("success", "Firestore Tests Completed");
  dispatchLog("info", "Initializing Storage Tests");
  const storage = getStorage();
  connectStorageEmulator(storage, host, 9199);
  await runStorageTests(storage, testEnv);
  //await testEnv.clearStorage();
  dispatchLog("success", "Storage Tests Completed");
  dispatchLog("success", "All Tests Completed");
  process.exit(0);
}
start();
