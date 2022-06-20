/* eslint-disable eqeqeq, radix */
import { Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';
import analytics from '@react-native-firebase/analytics';
import appConstants from '../libs/constants';
import versionDetails from '../libs/versionDetails';

const { updatedAppVersionType } = appConstants;

const Analytics = analytics();

const versionChecker = () => new Promise((resolve, reject) => {
  // const storeSpecificId = Platform.OS === 'ios' ? '1472975333' : 'com.kaercher.programme';
  const currentVersion = Platform.OS === 'ios' ? versionDetails.versionIOS : versionDetails.versionAndroid;
  const [majorCurrent, minorCurrent, patchCurrent] = currentVersion.split('.');

  VersionCheck.getLatestVersion().then((latestVersion) => {
    Analytics.logEvent('Builld_version', {
      platform: Platform.OS,
      version: latestVersion
    });
    if (!latestVersion) {
      resolve(updatedAppVersionType.NONE);
      return;
    }
    const [major, minor, patch] = latestVersion.split('.');
    if (parseInt(majorCurrent) < parseInt(major)) {
      resolve(updatedAppVersionType.MAJOR);
    } else if (parseInt(minorCurrent) < parseInt(minor)) {
      resolve(updatedAppVersionType.MINOR);
    } else if (parseInt(patchCurrent) < parseInt(patch)) {
      resolve(updatedAppVersionType.PATCH);
    } else {
      resolve(updatedAppVersionType.NONE);
    }
  }).catch(() => {
    reject();
  });
});

export default versionChecker;
