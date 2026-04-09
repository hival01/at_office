/**
 * database/sequelize/models/index.ts — Model Index (Auto-Loader)
 *
 * Auto-loads all *.model.ts files from this directory and registers them
 * with the Sequelize instance. This is the entry point for all models.
 *
 * How it works:
 *   - Scans this directory for files matching *.model.ts
 *   - Imports each model class
 *   - Registers associations after all models are loaded
 *
 * When adding a new model:
 *   1. Create the model file: user.model.ts
 *   2. It will be auto-discovered (no manual import needed)
 *   3. Define associations in the model's static associate() method
 */

// Re-export all models for convenient imports elsewhere
// export { UserModel } from './user.model';
