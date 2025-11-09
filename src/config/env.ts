import Config from 'react-native-config';

export type AppEnv = {
  ENV: 'development' | 'staging' | 'production';
  API_URL: string;
  APP_NAME?: string;
};

const env: AppEnv = {
  ENV: (Config.ENV as AppEnv['ENV']) ?? 'development',
  API_URL: Config.API_URL,
  APP_NAME: Config.APP_NAME,
};

export default env;
