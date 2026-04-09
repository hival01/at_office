/**
 * modules/user/services/user.service.ts — User Service
 *
 * Business logic layer. This is where you put:
 *   - Data transformation and validation
 *   - Cross-repository orchestration
 *   - External API calls
 *   - Business rules and workflows
 *
 * Services call repositories for data access — they NEVER call models directly.
 * Services throw HttpException subclasses for error cases.
 *
 * Example:
 *   const user = await this.userRepo.findById(id);
 *   if (!user) throw new NotFoundException('User not found');
 *   return user;
 */

// import { UserRepository } from '../repository/user.repository';
// import { NotFoundException } from '../../../common/helpers/response/http-exception';

// export class UserService {
//   private userRepo = new UserRepository();

//   async findAll() {
//     return this.userRepo.findAll();
//   }

//   async findById(id: string) {
//     const user = await this.userRepo.findById(id);
//     if (!user) throw new NotFoundException('User not found');
//     return user;
//   }

//   async create(data: any) {
//     // Add business logic: check duplicates, hash password, etc.
//     return this.userRepo.create(data);
//   }

//   async update(id: string, data: any) {
//     await this.findById(id); // Ensure user exists
//     return this.userRepo.update(id, data);
//   }

//   async delete(id: string) {
//     await this.findById(id); // Ensure user exists
//     return this.userRepo.delete(id);
//   }
// }
