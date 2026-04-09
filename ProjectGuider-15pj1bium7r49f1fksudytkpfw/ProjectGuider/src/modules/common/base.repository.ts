/**
 * modules/common/base.repository.ts — Base Repository (Abstract)
 *
 * Provides common CRUD methods that all repositories inherit.
 * Extend this class for every new module's repository.
 *
 * This is ORM-agnostic by design. The actual implementation depends
 * on which ORM you choose:
 *   - Sequelize: Use Sequelize model methods
 *   - Prisma: Use Prisma client methods
 *   - Mongoose: Use Mongoose model methods
 *
 * Example (Sequelize):
 *   class UserRepository extends BaseRepository {
 *     constructor() {
 *       super(UserModel);
 *     }
 *   }
 *
 * Common methods to implement:
 *   - findById(id, options?)
 *   - findOne(options)
 *   - findAll(options)
 *   - findAllWithQuery(where, listQuery, options?)
 *   - findAndCountAllWithQuery(where, listQuery, options?)
 *   - create(data)
 *   - bulkCreate(records, options?)
 *   - update(id, data, options?)
 *   - delete(id, options?)
 *   - upsert(data, options?)
 */

// Uncomment and implement based on your ORM choice
// export abstract class BaseRepository<T> {
//   protected model: any;
//
//   constructor(model: any) {
//     this.model = model;
//   }
//
//   async findById(id: string | number): Promise<T | null> {
//     return this.model.findByPk(id);
//   }
//
//   async findAll(): Promise<T[]> {
//     return this.model.findAll();
//   }
//
//   async create(data: Partial<T>): Promise<T> {
//     return this.model.create(data);
//   }
//
//   async update(id: string | number, data: Partial<T>): Promise<[number]> {
//     return this.model.update(data, { where: { id } });
//   }
//
//   async delete(id: string | number): Promise<number> {
//     return this.model.destroy({ where: { id } });
//   }
// }
