import {sequelize} from './database/sequelize';

(async () => {

  await sequelize.sync({force: true});

})();
