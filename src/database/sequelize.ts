import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    instanceName: 'MSSQLSERVER',
    connectTimeout: 60000,
  },
  host: '190.173.127.131',
  username: 'matias',
  password: 'Ms123456',
  database: 'MisTurnos',
});
