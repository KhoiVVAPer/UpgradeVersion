/**
 * @fileoverview This is aws configuration config file
 * @package
 */
import Config from 'react-native-config';

export default {
  // REQUIRED - Amazon Cognito Identity Pool ID
  // identityPoolId: '',
  region: Config.AWS_REGION,
  userPoolId: Config.AWS_USER_POOL_ID,
  userPoolWebClientId: Config.AWS_USER_POOL_WEB_CLIENT_ID
};
