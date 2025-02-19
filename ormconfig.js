const { DataSource } = require('typeorm');
const path = require('path');
const { config } = require('dotenv');

// Load environment variables
config({ path: path.resolve(__dirname, '.env') });

module.exports = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'src/database/migrations/*{.ts,.js}')],
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
});
