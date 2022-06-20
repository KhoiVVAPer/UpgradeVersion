import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const textMarkingSchema = {
  name: schemas.TEXT_MARKING,
  primaryKey: 'id',
  properties: {
    id: 'int',
    languageCode: { type: 'string' },
    countryCode: { type: 'string' },
    key: { type: 'string' },
    text: { type: 'string' },
    startOffset: { type: 'int' },
    endOffset: { type: 'int' },
    comment: { type: 'string' },
    highlightColor: { type: 'string' },
    commentDate: { type: 'int' }
  }
};

export default textMarkingSchema;
