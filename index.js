import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Auth from '@aws-amplify/auth';
import { awsconfig } from './src/config';
import { registerRoutes, rootNavigation } from './src/navigation';

registerRoutes();
Auth.configure(awsconfig);

if (Platform.OS === 'android') {
  console.reportErrorsAsExceptions = false;
}

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    enabled: true,
    root: {
      stack: {
        children: rootNavigation.landingPageNav
      }
    }
  });
  // Navigation.setDefaultOptions({
  //   layout: {
  //     orientation: ['landscape'],
  //     backgroundColor: '#fff'
  //   }
  // });
});
