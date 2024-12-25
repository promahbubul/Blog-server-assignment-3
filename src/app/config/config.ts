import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  salt_round: process.env.SALT_ROUND,
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  jwt_secret: process.env.JWT_SECRET,
};
