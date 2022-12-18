import 'dotenv/config';
import 'reflect-metadata';
import App from'./app';
import validaiteEnv from './utils/validateEnv';

import HomeController from './controllers/homeController';
validaiteEnv();

const app=new App(
    [
        new HomeController(),
    ]
);
app.listen();