import {
  ACPCore,
  ACPLifecycle,
  ACPIdentity,
  ACPSignal,
  ACPMobileLogLevel
} from '@adobe/react-native-acpcore';
import { ACPAnalytics } from '@adobe/react-native-acpanalytics';
import Config from 'react-native-config';

const initAdobeSdk = () => {
  ACPCore.setLogLevel(ACPMobileLogLevel.DEBUG);
  ACPCore.configureWithAppId('a13643f4feff/537bebb770bf/launch-cc4f5c39b1ca-staging');
  // ACPCore.configureWithAppId(Config.ADOBE_ENV_ID);
  // ACPLifecycle.registerExtension();
  // ACPIdentity.registerExtension();
  // ACPSignal.registerExtension();
  // ACPCore.start();
  // ACPAnalytics.registerExtension();
};

export default initAdobeSdk;
