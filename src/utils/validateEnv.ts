import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    DB_HOST: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
  });
};

export default validateEnv;