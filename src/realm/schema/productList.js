import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const productListSchema = {
  name: schemas.PRODUCT_LIST,
  primaryKey: 'id',
  properties: {
    id: 'int',
    productGroupId: { type: 'int', optional: true },
    export: { type: 'string', optional: true },
    year: { type: 'int', optional: true },
    country: { type: 'string', optional: true },
    language: { type: 'string', optional: true },
    createdAt: { type: 'string', optional: true },
    productGroupData: { type: 'string', optional: true },
    data: { type: 'string', optional: true },
  }
};

export default productListSchema;
