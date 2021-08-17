/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Settings} from 'react-native-fbsdk-next';
Settings.initializeSDK();
AppRegistry.registerComponent(appName, () => App);
