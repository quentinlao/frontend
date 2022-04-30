import { DataSource } from 'typeorm';

/**
 * Data Source hold connexion
 */
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    synchronize: true,
    logging: false,
    entities: [__dirname + '/entity/*.ts'],
    migrations: [],
    subscribers: [],
});
