import path from "node:path";
import fs from "fs";

export const createUploadsFolder = () => {
  const uploadFolder = path.join(path.dirname("./"), "uploads");
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
    console.log("Upload folder created!");
  }
};
