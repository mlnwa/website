export const databaseConfig = () => ({
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123',
    database: 'blog',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    dateStrings: true,
  },
});
