    import { DataSourceOptions ,DataSource} from 'typeorm';

    export const AppDataSource = new DataSource({
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
    })
    const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRESQL_PATH,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASENAME,
    // entities: [
    // __dirname + '/../**/*.entity{.ts,.js}',
    // ],
    entities: [
        "src/entity/*{.ts,.js}"
      ],
    subscribers: [
        "src/subscriber/*{.ts,.js}"
      ],
    migrations: [
        "src/migration/*{.ts,.js}"
      ],
    synchronize: true,
    };

    export default config;