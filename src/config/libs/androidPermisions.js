/**
 * @fileoverview For android devices when all required permissions
 * prompt messages are triggered from this this config file
 * @package
 */
import { Platform, PermissionsAndroid } from 'react-native';

//* * Get storage read permission for android */
const getStorageReadPermission = async () => new Promise(async (resolve, reject) => {
  if (Platform.OS === 'ios') {
    resolve(true);
  } else {
    const permissionName = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const permissions = await PermissionsAndroid.request(permissionName);
    if (permissions === PermissionsAndroid.RESULTS.GRANTED) {
      resolve(true);
    } else {
      const err = 'Error in storage permission';
      reject(err);
    }
  }
});

//* * Get storage write permission for android */
const getStorageWritePermission = async () => new Promise(async (resolve, reject) => {
  if (Platform.OS === 'ios') {
    resolve(true);
  } else {
    const permissionName = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const permissions = await PermissionsAndroid.request(permissionName);
    if (permissions === PermissionsAndroid.RESULTS.GRANTED) {
      resolve(true);
    } else {
      const err = 'Error in storage permission';
      reject(err);
    }
  }
});

//* * Get all app permissions */
export default async () => (
  new Promise(async (resolve) => {
    if (Platform.OS === 'android') {
      try {
        await getStorageReadPermission();
        await getStorageWritePermission();
        resolve(true);
      } catch (err) {
        console.log({ err });
      }
    } else {
      resolve(true);
    }
  })
);
