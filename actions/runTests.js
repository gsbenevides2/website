const { exec, spawn } = require('child_process');
const testConnection = async () => {
    const ports = [8080, 9199, 9099]
    const checkPortIsFree = (port) => {
        return new Promise((resolve, reject) => {
            exec(`lsof -i:${port}`, (error, stdout, stderr) => {
                if (error) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });

    }
    const allPortsIsNotFree =
        (await Promise.all(ports.map(port => checkPortIsFree(port)))).every(portIsNotFree => !portIsNotFree);
    console.log('Checking connection...');
    return allPortsIsNotFree;
}
let processNode = null;

const startFirebaseEmulator = (continueCallback) => {
    console.log('Starting Firebase emulator...');
    return new Promise((resolve, reject) => {
        try {
            processNode = spawn('yarn', ['run', 'firebase', 'emulators:start', "--only firestore,auth,storage"], {
                stdio: 'inherit',
                shell: true
            })
            let test = setInterval(() => {
                testConnection().then((isConnected) => {
                    if (isConnected) {
                        clearInterval(test);
                        resolve();
                    }
                });
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    });
}

const runTests = async () => {
    console.log('Running tests...');
    return new Promise((resolve, reject) => {
        spawn('yarn', ['run', 'testRules'], {
            stdio: 'inherit',
            shell: true
        }).on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject();
            }
        });
    });
}

const stopFirebaseEmulator = async () => {
    try {
        console.log('Stopping Firebase emulator...');
        processNode.kill();
        exec("pkill node");
    } catch (error) {
        console.error(error);
    }
}

const runAutomatedTestRules = async () => {
    console.log('Running automated test rules...');
    await startFirebaseEmulator();

    await runTests();

    console.log('Firebase emulator started');
    await stopFirebaseEmulator();
    console.log('Firebase emulator stopped');
    console.log('Automated test rules finished with success');
    process.exit(0);
}

runAutomatedTestRules();