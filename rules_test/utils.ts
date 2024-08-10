export const redText = (text: string) => `\x1b[31m${text}\x1b[0m`;
export const white = (text: string) => `\x1b[37m${text}\x1b[0m`;
export const greenText = (text: string) => `\x1b[32m${text}\x1b[0m`;
export const yellowText = (text: string) => `\x1b[33m${text}\x1b[0m`;
export const cyanText = (text: string) => `\x1b[36m${text}\x1b[0m`;

type LogType = "error" | "info" | "success" | "warning";
export const dispatchLog = (type: LogType, message: string) => {
  switch (type) {
    case "error":
      console.log(redText("Error:"), white(message));
      break;
    case "info":
      console.log(cyanText("Info:"), white(message));
      break;
    case "success":
      console.log(greenText("Success:"), white(message));
      break;
    case "warning":
      console.log(yellowText("Warning:"), white(message));
      break;
    default:
      console.log(message);
      break;
  }
};

export const registerTest = async (testName: string, testFunction: () => Promise<any>) => {
  try {
    await testFunction();
    const str = `${greenText("Test Passed:")} ${white(testName)}`;
    console.log(str);
  } catch (error) {
    const str = `${redText("Test Failed:")} ${white(testName)}`;
    console.log(str);
    console.log(error);
    process.exit(1);
  }
};
