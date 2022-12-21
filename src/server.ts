import 'dotenv/config';
import 'reflect-metadata';
import App from'./app';
import validaiteEnv from './utils/validateEnv';

import HomeController from './controllers/homeController';
import AttributeController from './controllers/attributeController';
import UploadController from './controllers/uploadController';
import AuthenticationController from './controllers/authenticationController';

validaiteEnv();

const app=new App(
    [
        new AuthenticationController(),
        new HomeController(),
        new AttributeController(),
        new UploadController(),
    ]
);
app.listen();