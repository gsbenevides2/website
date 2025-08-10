import { ChildProcessWithoutNullStreams, execSync, spawn } from "child_process";
import path from "path";
import { dispatchLog } from "./utils";

const killAllJavaProcesses = () => {
  try {
    dispatchLog("info", "Killing all Java processes...");
    execSync("killall java");
  } catch (error) {
    dispatchLog("info", "No Java processes found");
  }
};

const startFirebaseEmulator = () => {
  dispatchLog("info", "Starting Firebase emulator...");
  return new Promise<ChildProcessWithoutNullStreams>(async (resolve, reject) => {
    try {
      const processNode = spawn("yarn", ["run", "firebase", "emulators:start", "--only firestore,auth,storage"], {
        stdio: "pipe",
        shell: true,
        cwd: path.resolve(__dirname, ".."),
      });
      dispatchLog("info", "Waiting emulators startup...");
      processNode.stdout.on("data", (data) => {
        process.stdout.write(data);
        if (data.toString().includes("All emulators ready!")) {
          dispatchLog("success", "Firebase emulator started");
          resolve(processNode);
        }
      });
      processNode.stderr.on("data", (data) => {
        process.stdout.write(data.toString());
      });
      processNode.on("exit", (code) => {
        if (code === 0) {
          resolve(processNode);
        } else {
          dispatchLog("error", "Error starting Firebase emulator");
          reject();
        }
      });
    } catch (error) {
      dispatchLog("error", "Error starting Firebase emulator");
      reject(error);
    }
  });
};

const runTests = async () => {
  dispatchLog("info", "Running tests...");
  return new Promise<void>((resolve, reject) => {
    spawn("yarn", ["run", "testRules"], {
      stdio: "inherit",
      shell: true,
      cwd: path.resolve(__dirname, ".."),
    }).on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

const stopFirebaseEmulator = async (processToStop: ChildProcessWithoutNullStreams) => {
  try {
    dispatchLog("info", "Stopping Firebase emulator...");
    processToStop.stdout.removeAllListeners();
    processToStop.stderr.removeAllListeners();
    processToStop.removeAllListeners();
    processToStop.kill("SIGINT");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    execSync("killall java");
    dispatchLog("success", "Firebase emulator started");
  } catch (error) {
    dispatchLog("error", "Error stopping Firebase emulator");
    console.error(error);
  }
};

const runAutomatedTestRules = async () => {
  killAllJavaProcesses();
  dispatchLog("info", "Starting automated test rules...");
  const processFirestore = await startFirebaseEmulator();
  await runTests();
  dispatchLog("success", "Automated test rules finished with success");
  await stopFirebaseEmulator(processFirestore);
  dispatchLog("info", "Firebase emulator stopped");
  dispatchLog("success", "Automated test rules finished with success");
  process.exit(0);
};

runAutomatedTestRules();
