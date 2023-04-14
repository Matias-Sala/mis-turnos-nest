import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    instanceName: 'MSSQLSERVER',
    connectTimeout: 60000,
  },
  host: '190.173.81.44',
  username: '',
  password: '',
  database: '',
});
