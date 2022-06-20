import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const offlineDownload = {
  name: schemas.OFFLINE_DOWNLOAD,
  properties: {
    proffesional: { type: 'string' },
    home_and_garden: { type: 'string' },
    proffesional_db: { type: 'string' },
    home_and_garden_db: { type: 'string' },
    lastDownload: { type: 'string' },
    proffesional_media_flag: { type: 'string' },
    home_and_garden_media_flag: { type: 'string' },
    mediaLastDownload: { type: 'string' },
  }
};

export default offlineDownload;
