/**
 * modules/user/controller/user.controller.ts — User Controller
 *
 * Thin handler layer: extracts input from req → calls service → returns response.
 * Controllers should NOT contain business logic — that belongs in the service layer.
 *
 * Every handler should be wrapped with catchAsync() to forward errors
 * to the global error middleware automatically.
 *
 * Pattern:
 *   methodName = catchAsync(async (req, res) => {
 *     const result = await this.service.someMethod(req.body);
 *     generalResponse({ req, res, data: result, message: 'Done' });
 *   });
 */

// import { Request, Response } from 'express';
// import { catchAsync } from '../../../common/helpers/catch-async';
// import { generalResponse } from '../../../common/helpers/response/general-response';
// import { UserService } from '../services/user.service';
// import { HttpStatus } from '../../../common/constants/http.constants';

// export class UserController {
//   private userService = new UserService();

//   getAll = catchAsync(async (req: Request, res: Response) => {
//     const users = await this.userService.findAll();
//     generalResponse({ req, res, data: users, message: 'Users fetched successfully' });
//   });

//   getById = catchAsync(async (req: Request, res: Response) => {
//     const user = await this.userService.findById(req.params.id);
//     generalResponse({ req, res, data: user, message: 'User fetched successfully' });
//   });

//   create = catchAsync(async (req: Request, res: Response) => {
//     const user = await this.userService.create(req.body);
//     generalResponse({ req, res, data: user, message: 'User created', statusCode: HttpStatus.CREATED });
//   });

//   update = catchAsync(async (req: Request, res: Response) => {
//     const user = await this.userService.update(req.params.id, req.body);
//     generalResponse({ req, res, data: user, message: 'User updated' });
//   });

//   delete = catchAsync(async (req: Request, res: Response) => {
//     await this.userService.delete(req.params.id);
//     generalResponse({ req, res, message: 'User deleted' });
//   });
// }
