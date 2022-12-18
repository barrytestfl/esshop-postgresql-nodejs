    import { DataSourceOptions ,DataSource} from 'typeorm';

    const AppDataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "123456",
        database: "eshop",
        entities: [
            "src/entities/*{.ts,.js}"
          ],
        subscribers: [
            "src/subscribers/*{.ts,.js}"
          ],
        migrations: [
            "src/migrations/*{.ts,.js}"
          ],        
        synchronize: true,
        logging: false
    });
    export default AppDataSource; 
     