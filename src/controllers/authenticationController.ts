import express,{ Router,Request,Response,NextFunction } from 'express';
import IController from './../interfaces/IController';
import AppDataSource from 'utils/ormcong';
import User from './../entities/user.model';
import UserDTO from 'metadata_DTO/user.dto';
import LogInDTO from 'metadata_DTO/customDTO/loginDTO';    
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from   '../exceptions/WrongCredentialsException';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from './../interfaces/IDataStoredInToken';
import TokenData from '../interfaces/ITokenData';

class Authentication implements IController{
    public path: string='/Auth';
    public router: Router=express.Router();
    private userRepository=AppDataSource.getRepository(User)
    constructor(){

    }
    private InitializeRoutes(){
        this.router
        .post(`${this.path}/login`,this.loggingIn)
         .post(`${this.path}/rigister`,this.register);
    }
    private loggingIn = async (request: express.Request, response: express.Response, next:express.NextFunction) => {
        const logInData: LogInDTO = request.body;
        console.log('body',logInData.email)
        
        const user = await this.userRepository.findOneBy({ Email: logInData.email });
        console.log('user.password',user)
        if (user) {
         
          const isPasswordMatching = await bcrypt.compare(logInData.password,user.Password);
          console.log('isPasswordMatching',isPasswordMatching)
          if (isPasswordMatching) {
            user.Password = 'undefined';
            const tokenData = this.createToken(user);
            response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            response.send(user);
    
          } else {
            next(new WrongCredentialsException());
          }
        } else {
          next(new WrongCredentialsException());
        }
      }
    private register=async(reqest:Request,response:Response,next:NextFunction)=>{
        const user:UserDTO=reqest.body;
        const userData=await this.userRepository.findOneBy({Email:user.Email});
        if  (userData){
            throw new UserWithThatEmailAlreadyExistsException(user.Email);
        }
        
        user.Password= await bcrypt.hash(user.Password,10);        
        const tuser = await this.userRepository.create(user);
        const tokenData = this.createToken(tuser);
            response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            response.send(user);
    }
    public createCookie(tokenData: TokenData) {
      return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
    public createToken(user: User): TokenData {
      const expiresIn = 60 * 60; // an hour
      const secret= process.env.JWT_SECRET as jwt.Secret;
      const dataStoredInToken: DataStoredInToken = {
        _id: `${user.Id}`,
      };
      return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
      };
    }
}
export default Authentication;