import multer from "multer";
import path from "path";
import fs from "fs";

// Caminho onde as imagens serão salvas
const uploadsPath = path.join(__dirname, "..", "..", "uploads", "users");

// Criar pasta uploads/users se não existir
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: multer.File, cb: any) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de arquivo inválido. Envie uma imagem."), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});
