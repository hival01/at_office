/**
 * modules/user/repository/user.repository.ts — User Repository
 *
 * Data access layer. Extends BaseRepository for common CRUD operations.
 * Add module-specific queries here (e.g., findByEmail, searchUsers).
 *
 * The repository is the ONLY layer that talks to the ORM/database directly.
 * Services should never import models — they go through the repository.
 *
 * Depending on your ORM choice:
 *   - Sequelize: pass the Sequelize model to BaseRepository
 *   - Prisma: use prisma.user.findMany(), etc.
 *   - Mongoose: pass the Mongoose model to BaseRepository
 */

// Sequelize example:
// import { BaseRepository } from '../../common/base.repository';
// import { UserModel } from '../../../database/sequelize/models/user.model';

// export class UserRepository extends BaseRepository<UserModel> {
//   constructor() {
//     super(UserModel);
//   }

//   async findByEmail(email: string) {
//     return this.model.findOne({ where: { email } });
//   }
// }

// Prisma example:
// import { prisma } from '../../../database/prisma/client';

// export class UserRepository {
//   async findAll() {
//     return prisma.user.findMany();
//   }
//   async findByEmail(email: string) {
//     return prisma.user.findUnique({ where: { email } });
//   }
// }

// Mongoose example:
// import { User } from '../../../database/mongoose/models/user.model';

// export class UserRepository {
//   async findAll() {
//     return User.find();
//   }
//   async findByEmail(email: string) {
//     return User.findOne({ email });
//   }
// }
