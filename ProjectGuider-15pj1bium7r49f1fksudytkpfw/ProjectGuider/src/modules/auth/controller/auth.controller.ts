/**
 * modules/auth/controller/auth.controller.ts — Auth Controller
 *
 * Handles authentication endpoints: login, register, token refresh, password reset.
 * Thin layer — extracts input, calls AuthService, returns response.
 *
 * Typical endpoints:
 *   POST /auth/register — create new user account
 *   POST /auth/login — authenticate and return JWT tokens
 *   POST /auth/refresh — refresh access token using refresh token
 *   POST /auth/forgot-password — initiate password reset flow
 *   POST /auth/reset-password — complete password reset
 *   POST /auth/logout — invalidate tokens (if using token blacklisting)
 */

// import { Request, Response } from 'express';
// import { catchAsync } from '../../../common/helpers/catch-async';
// import { generalResponse } from '../../../common/helpers/response/general-response';
// import { AuthService } from '../services/auth.service';
// import { HttpStatus } from '../../../common/constants/http.constants';

// export class AuthController {
//   private authService = new AuthService();

//   register = catchAsync(async (req: Request, res: Response) => {
//     const result = await this.authService.register(req.body);
//     generalResponse({ req, res, data: result, message: 'Registration successful', statusCode: HttpStatus.CREATED });
//   });

//   login = catchAsync(async (req: Request, res: Response) => {
//     const result = await this.authService.login(req.body);
//     generalResponse({ req, res, data: result, message: 'Login successful' });
//   });

//   refreshToken = catchAsync(async (req: Request, res: Response) => {
//     const result = await this.authService.refreshToken(req.body.refreshToken);
//     generalResponse({ req, res, data: result, message: 'Token refreshed' });
//   });

//   forgotPassword = catchAsync(async (req: Request, res: Response) => {
//     await this.authService.forgotPassword(req.body.email);
//     generalResponse({ req, res, message: 'Password reset email sent' });
//   });

//   resetPassword = catchAsync(async (req: Request, res: Response) => {
//     await this.authService.resetPassword(req.body.token, req.body.password);
//     generalResponse({ req, res, message: 'Password reset successful' });
//   });
// }
