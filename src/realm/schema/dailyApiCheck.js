import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const dailyApiCheckSchema = {
  name: schemas.DAILY_API_CHECK,
  properties: {
    apiName: 'string',
    id: 'string',
    apiCallDate: 'string'
  }
};

export default dailyApiCheckSchema;
