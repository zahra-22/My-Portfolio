import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('./server/.env') }); // ensures it reads server/.env

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mernproject',
  jwtSecret: process.env.JWT_SECRET || 'YOUR_default_secret'
};

export default config;
