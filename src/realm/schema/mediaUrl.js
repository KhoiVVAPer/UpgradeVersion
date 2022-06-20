import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const mediaUrl = {
  name: schemas.MEDIA_URL,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', optional: true },
    hgMediaUrl: { type: 'string', optional: true },
    profMediaUrl: { type: 'string', optional: true },
  }
};

export default mediaUrl;
