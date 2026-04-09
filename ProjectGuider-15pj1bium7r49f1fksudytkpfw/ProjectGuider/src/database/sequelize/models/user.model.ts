/**
 * database/sequelize/models/user.model.ts — User Sequelize Model
 *
 * Defines the User table schema using sequelize-typescript decorators.
 * Works with both PostgreSQL and MySQL.
 *
 * Key decorators:
 *   @Table — defines table name and options
 *   @Column — defines a column with type and constraints
 *   @HasMany, @BelongsTo, @BelongsToMany — define associations
 *
 * When modifying the schema:
 *   1. Update this model file
 *   2. Create a migration: npm run migrate:create -- add-field-to-users
 *   3. Run migration: npm run migrate
 *   4. Update any affected services/repositories
 */

// import {
//   Table, Column, Model, DataType, CreatedAt, UpdatedAt,
//   PrimaryKey, AutoIncrement, Unique, Default, AllowNull
// } from 'sequelize-typescript';

// @Table({ tableName: 'users', timestamps: true })
// export class UserModel extends Model {
//   @PrimaryKey
//   @AutoIncrement
//   @Column(DataType.INTEGER)
//   id!: number;

//   @AllowNull(false)
//   @Column(DataType.STRING(100))
//   name!: string;

//   @Unique
//   @AllowNull(false)
//   @Column(DataType.STRING(255))
//   email!: string;

//   @AllowNull(false)
//   @Column(DataType.STRING(255))
//   password!: string;

//   @Default('user')
//   @Column(DataType.ENUM('user', 'admin'))
//   role!: string;

//   @Default(true)
//   @Column(DataType.BOOLEAN)
//   isActive!: boolean;

//   @CreatedAt
//   createdAt!: Date;

//   @UpdatedAt
//   updatedAt!: Date;
// }
