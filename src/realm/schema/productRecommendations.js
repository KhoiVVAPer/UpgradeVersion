import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const productRecommendationSchema = {
  name: schemas.PRODUCT_RECOMMENDATIONS,
  primaryKey: 'id',
  properties: {
    id: 'int',
    recommendationsId: { type: 'string' },
    country: { type: 'string' },
    language: { type: 'string' },
    partNumber: 'string',
    data: { type: 'list', objectType: schemas.PRODUCT_RECOMMENDATIONS_LIST },
  }
};

const productRecommendationListSchema = {
  name: schemas.PRODUCT_RECOMMENDATIONS_LIST,
  properties: {
    partnumberFormatted: 'string',
    pageID: 'int',
    name: { type: 'string' },
    image: { type: 'string' }
  }
};

export {
  productRecommendationSchema,
  productRecommendationListSchema
};
