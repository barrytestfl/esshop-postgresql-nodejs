import express from "express";
import cookieParser from 'cookie-parser'
import IController from './interfaces/IController';
import errormiddleware from './middlewares/errormiddleware';

import config,{AppDataSource} from './utils/ormcong';


class App{
    public app:express.Application;
    constructor(controllers:IController[]){
            this.app=express();
            this.connectToDataBase();
            this.initializeMiddlewares();
            this.initializeControllers(controllers);
            this.initializeErrorsHandling();
    }
    public listen(){
            this.app.listen(process.env.PORT,()=>{
                console.log(`the app runing on port : ${process.env.PORT}`)
            })
    }
    private initializeMiddlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); 
        this.app.use(cookieParser())
    }
    private initializeErrorsHandling(){
            this.app.use(errormiddleware)
    }
    private initializeControllers(controllers:IController[]){
            controllers.forEach((controller)=>{
                this.app.use('/',controller.router);
            });
    }
    private async connectToDataBase(){
        
     AppDataSource.initialize()
        .then(() => {
            console.log('conected to database success!')
        })
        .catch((error) => console.log(error))
                
        }
}
export default App;