import dotenv from 'dotenv';


dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: 'development' | 'production' ;
  JWT_ACCESS_SECRET:string,
  JWT_ACCESS_EXPIRES:string,
  JWT_REFRESH_SECRET:string,
  JWT_REFRESH_SECRET_EXPIRED:string,
  BCRYPT_SALT_ROUND:string,
  SUPER_ADMIN_EMAIL:string,
  SUPER_ADMIN_PASSWORD:string,
  GOGGLE_CALLBACK_URL:string,
  GOOGLE_CLIENT_SECRET:string,
  GOOGLE_CLIENT_ID:string,
  FRONTEND_URL:string,
   EXPRESS_SESSION_SECRET:string,


}
const loadEnvVariable = (): EnvConfig => {
  const requiredEnvVars = ['PORT', 'DB_URL', 'NODE_ENV','JWT_ACCESS_SECRET','JWT_ACCESS_EXPIRES','BCRYPT_SALT_ROUND','SUPER_ADMIN_EMAIL','SUPER_ADMIN_PASSWORD','JWT_REFRESH_SECRET','JWT_REFRESH_SECRET_EXPIRED',"GOGGLE_CALLBACK_URL","GOOGLE_CLIENT_SECRET","GOOGLE_CLIENT_ID","FRONTEND_URL"," EXPRESS_SESSION_SECRET"];
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
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_SECRET_EXPIRED:process.env.JWT_REFRESH_SECRET_EXPIRED as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,  
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    GOGGLE_CALLBACK_URL: process.env.GOGGLE_CALLBACK_URL as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
     EXPRESS_SESSION_SECRET: process.env. EXPRESS_SESSION_SECRET as string,
  };
};



export const envConfig = loadEnvVariable();
