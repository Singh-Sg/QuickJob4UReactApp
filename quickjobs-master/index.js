import { AppRegistry, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import App from './App';
StatusBar.setBarStyle('light-content');
//SafeAreaView.setStatusBarHeight(0);
StatusBar.setBackgroundColor('#000');
console.disableYellowBox = true;
AppRegistry.registerComponent('QuickJobs4u', () => App);
//android:screenOrientation="portrait"