import HttpException  from './HttpException'
class NotAuthorizedException extends HttpException{
    constructor(){
        super(403,'You Are Not Autherized.')
    }
}
export default NotAuthorizedException;