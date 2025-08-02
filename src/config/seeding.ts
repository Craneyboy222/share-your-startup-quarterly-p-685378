import { Seeder } from 'sequelize-cli';
import sequelize from './database';

const seeder = new Seeder({
  migrations: { glob: 'src/seeders/*.js' },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

export default seeder;