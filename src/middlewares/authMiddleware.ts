import { Response,Request,NextFunction } from "express";
import RequestWithUser from './../interfaces/RequestWithUser';
import AuthenticationTokenMissingException from "../exceptions/AuthenticationTokenMissingException";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationTokenException";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import * as jwt from 'jsonwebtoken'
import IDataStoredInToken from './../interfaces/IDataStoredInToken';
import AppDataSource from "../utils/ormcong";
import User from "../entities/user.model";
import IUser from './../interfaces/IUser';
const authMiddleware=async(request: RequestWithUser, response: Response, next: NextFunction) =>{
    const userRepository=AppDataSource.getRepository(User);
    const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET as jwt.Secret;
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as IDataStoredInToken;
      const id =Number(verificationResponse._id);
      const user = await userRepository.findOneBy({Id:id});
      if (user) {
        request.user={_id:user.Id,firstName:user.FirstName,lastName:user.LastName,email:user.Email,fullName:`${user.FirstName} ${user.LastName}`} as IUser;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
 }
export default authMiddleware;