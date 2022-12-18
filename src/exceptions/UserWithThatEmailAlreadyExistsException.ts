import HttpException from "./HttpException";
class UserWithThatEmailAlreadyExistsException extends HttpException{
    constructor(){
        super(400,'User with email ${email} already exists')
    }
}