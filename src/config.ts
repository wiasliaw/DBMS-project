import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT,
  mode: process.env.NODE_ENV,
  db: {
    password: 'cfgcmapy',
    user: 'postgres',
    host: 'localhost',
    database: 'project',
    port: 5432,
  },
};

export default config;
