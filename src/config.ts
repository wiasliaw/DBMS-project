import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT,
  mode: process.env.NODE_ENV,
  admin: {
    user: 'tsperfect',
    pawd: '12345678',
  },
};

export default config;
