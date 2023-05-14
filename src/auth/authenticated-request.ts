import { Request } from 'express';
import { UserEntity } from '../user/user.entity';

export interface AuthenticatedRequest extends Request {
  user: UserEntity; // Assuming the UserEntity is the type of the user object
}
