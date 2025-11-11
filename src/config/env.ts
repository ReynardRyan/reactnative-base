import Config from 'react-native-config';

export type AppEnv = {
  ENV: 'development' | 'staging' | 'production';
  API_URL: string;
  APP_NAME?: string;
};

const env: AppEnv = {
  ENV: (Config.ENV as AppEnv['ENV']) ?? 'development',
  API_URL: 'http://36.88.32.238:1337/api/v1',
  APP_NAME: Config.APP_NAME,
};

export default env;
