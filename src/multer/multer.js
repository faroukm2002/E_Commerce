import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/AppError.js";

function refactorMulter(folderName) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + " - " + file.originalname);
    },
  });
// filter image or vieode or text
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("Images only", 401), false);
    }
  }

  return multer({ storage, fileFilter });

}

export const uploadSingleFile = (fieldName, folderName) => refactorMulter(folderName).single(fieldName);

export const uploadMixFiles = (arrOFfields, folderName) => refactorMulter(folderName).fields(arrOFfields);
 
 