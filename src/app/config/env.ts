import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: 'development' | 'production' ;
  JWT_ACCESS_SECRET:string,
  JWT_ACCESS_EXPIRES:string,
  BCRYPT_SALT_ROUND:string,

}
const loadEnvVariable = (): EnvConfig => {
  const requiredEnvVars = ['PORT', 'DB_URL', 'NODE_ENV'];
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing environment variable: ${envVar}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES:process.env.JWT_ACCESS_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string
  };
};



export const envConfig = loadEnvVariable();
