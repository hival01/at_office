/**
 * middlewares/multer.middleware.ts — File Upload Middleware
 *
 * Configures multer for file uploads with two storage backends:
 *   - local: saves to disk (for development)
 *   - s3: uploads to AWS S3 (for production)
 *
 * Controlled by FILE_STORAGE_DRIVER env var.
 *
 * Usage in routes:
 *   this.router.post(
 *     '/upload',
 *     authMiddleware,
 *     upload.single('file'),    // single file
 *     // upload.array('files', 5), // multiple files (max 5)
 *     this.controller.uploadFile
 *   );
 */

// import multer from 'multer';
// import path from 'path';
// import { env } from '../config';

// const localStorage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, env.LOCAL_UPLOAD_DIR);
//   },
//   filename: (_req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// For S3 storage, install and use multer-s3:
// import multerS3 from 'multer-s3';
// import { S3Client } from '@aws-sdk/client-s3';

// export const upload = multer({
//   storage: localStorage,
//   limits: { fileSize: env.MAX_UPLOAD_SIZE_MB * 1024 * 1024 },
//   fileFilter: (_req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type'));
//     }
//   },
// });
