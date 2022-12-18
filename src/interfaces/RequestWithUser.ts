import { Request } from 'express';
import IUser from './IUser';

interface RequestWithUser extends Request {
  user: IUser;
}

export default RequestWithUser;