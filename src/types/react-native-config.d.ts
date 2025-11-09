declare module 'react-native-config' {
  export interface ReactNativeConfig {
    ENV: 'development' | 'staging' | 'production';
    API_URL: string;
    APP_NAME?: string;
  }
  const Config: ReactNativeConfig;
  export default Config;
}
