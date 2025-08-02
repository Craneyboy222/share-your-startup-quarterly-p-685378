import { Sequelize } from 'sequelize';

let database: Sequelize;

export const connectDatabase = async () => {
  database = new Sequelize('postgres://user:pass@localhost:5432/mydb');
  await database.authenticate();
};

export const disconnectDatabase = async () => {
  if (database) {
    await database.close();
  }
};