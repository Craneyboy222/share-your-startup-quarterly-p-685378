import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from './database';

const umzug = new Umzug({
  migrations: { glob: 'src/migrations/*.js' },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

export default umzug;