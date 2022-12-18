import 'dotenv/config';
import 'reflect-metadata';
import App from'./app';
import validaiteEnv from './utils/validateEnv';

import HomeController from './controllers/homeController';
import AttributeController from 'controllers/attributeController';
validaiteEnv();

const app=new App(
    [
        new HomeController(),
        new AttributeController(),
    ]
);
app.listen();