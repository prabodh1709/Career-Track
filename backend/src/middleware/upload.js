import multer from 'multer';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export const uploadDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../uploads');
mkdirSync(uploadDir, { recursive: true });

const acceptedTypes = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDir),
  filename: (_req, file, callback) => {
    const safeName = file.originalname.replace(/[^a-z0-9._-]/gi, '-').toLowerCase();
    callback(null, `${Date.now()}-${safeName}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => callback(null, acceptedTypes.has(file.mimetype)),
});
