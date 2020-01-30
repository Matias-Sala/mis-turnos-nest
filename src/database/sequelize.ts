import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    instanceName: 'MSSQLSERVER',
  },
  host: '192.168.1.109',
  username: 'matias',
  password: 'Ms123456',
  database: 'MisTurnos',
});
