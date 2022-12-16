import {cleanEnv,str,port} from 'envalid';
export default function validaiteEnv(){
    cleanEnv(process.env,{
        JWT_SECRET: str(),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        POSTGRESQL_PATH:str(),
        POSTGRESQL_USER:str(),
        POSTGRESQL_PASSWORD:str(),
        PORT: port(),
    })
}