import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    instanceName: 'MSSQLSERVER',
  },
  host: '190.173.127.131',
  port: 1433,
  username: 'matias',
  password: 'Ms123456',
  database: 'MisTurnos',
});
