/**
 * modules/auth/services/auth.service.ts — Auth Service
 *
 * Business logic for authentication: password hashing, JWT generation,
 * token verification, password reset flows.
 *
 * Typical responsibilities:
 *   - Hash passwords with bcrypt before storing
 *   - Generate access + refresh JWT tokens
 *   - Verify credentials during login
 *   - Handle refresh token rotation
 *   - Trigger password reset emails
 *
 * Dependencies:
 *   - bcryptjs for password hashing
 *   - jsonwebtoken for JWT operations
 *   - UserRepository for user data access
 */

// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { env } from '../../../config';
// import { UserRepository } from '../../user/repository/user.repository';
// import { UnauthorizedException, ConflictException } from '../../../common/helpers/response/http-exception';

// export class AuthService {
//   private userRepo = new UserRepository();

//   async register(data: { name: string; email: string; password: string }) {
//     const existingUser = await this.userRepo.findByEmail(data.email);
//     if (existingUser) throw new ConflictException('Email already registered');

//     const hashedPassword = await bcrypt.hash(data.password, 12);
//     const user = await this.userRepo.create({ ...data, password: hashedPassword });

//     const tokens = this.generateTokens({ id: user.id, email: user.email, role: user.role });
//     return { user, ...tokens };
//   }

//   async login(data: { email: string; password: string }) {
//     const user = await this.userRepo.findByEmail(data.email);
//     if (!user) throw new UnauthorizedException('Invalid credentials');

//     const isMatch = await bcrypt.compare(data.password, user.password);
//     if (!isMatch) throw new UnauthorizedException('Invalid credentials');

//     const tokens = this.generateTokens({ id: user.id, email: user.email, role: user.role });
//     return { user, ...tokens };
//   }

//   private generateTokens(payload: object) {
//     const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
//     const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });
//     return { accessToken, refreshToken };
//   }
// }
