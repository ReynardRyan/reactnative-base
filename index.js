/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { enableFreeze } from 'react-native-screens';
import App from './App';
import { name as appName } from './app.json';

// Membekukan screen yang tidak aktif untuk mengurangi jank saat transisi
enableFreeze(true);

AppRegistry.registerComponent(appName, () => App);
