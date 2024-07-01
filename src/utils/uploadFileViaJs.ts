export const uploadFileViaJs = async (): Promise<File> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";
    input.onchange = () => {
      if (input.files === null) return reject("No file selected");
      resolve(input.files[0]);
    };
    input.click();
  });
};

