import express from "express";
import cors from 'cors';
import multer from "multer";
import cookieParser from 'cookie-parser'
import IController from './interfaces/IController';
import errorMiddleware from './middlewares/errormiddleware';
import errorHandler from './middlewares/error-handler.middleware';
 
import AppDataSource from './utils/ormcong';


class App{
    public app:express.Application;
    private upload=multer();
   

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
         // enable all CORS request
        this.app.use(cors());
        // parse incoming request body and append data to `req.body`
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); 
        // for parsing multipart/form-data
        this.app.use(this.upload.single('nou')); 
        //enabe request.coockies
        this.app.use(cookieParser());
        //access static path file
        this.app.use(express.static('public'));
      
    }
    public initializeErrorsHandling(){
        this.app.use(errorMiddleware);    
       // this.app.use(errorHandler);
            
    } 
    private initializeControllers(controllers:IController[]){
            controllers.forEach((controller)=>{
                this.app.use('/',controller.router);
            });
    }
    private async connectToDataBase(){
     
     AppDataSource.initialize()
        .then(() => {
            console.log('conected to database success! redis ')
        })
        .catch((error) =>  console.log(`cant conect to database :${error}!`));       
        }
        
}
export default App;