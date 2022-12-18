import HttpException from "./HttpException";
class UserNotFoundException extends HttpException{
    constructor(){
        super(404,'User Not Found!')
    }
}

export default UserNotFoundException;