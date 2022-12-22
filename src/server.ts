import 'dotenv/config';
import 'reflect-metadata';
import App from'./app';
import validaiteEnv from './utils/validateEnv';
import AuthenticationController from './controllers/authenticationController';
import HomeController from './controllers/homeController';
import AttributeController from './controllers/attributeController';
import AttributeValueController from './controllers/attributeValueController';
import AttributeDetailController from './controllers/attributeDetailController';
import BrandController from './controllers/brandController';
import GroupController from './controllers/groupController';
import ProductController from './controllers/productController';
import UserController from './controllers/userController';
import UploadController from './controllers/uploadController';

validaiteEnv();

const app=new App(
    [
        new AuthenticationController(),
        new HomeController(),
        new AttributeController(),
        new AttributeValueController(),
        new AttributeDetailController(),
        new BrandController(),
        new GroupController(),
        new ProductController(),
        new UserController(),
        new UploadController(),
        
    ]
);
app.listen();