import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwtSecret: process.env.JWT_SECRET,
}));
