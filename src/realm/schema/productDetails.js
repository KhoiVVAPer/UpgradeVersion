import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const productDetailsSchema = {
  name: schemas.PRODUCT_DETAILS,
  primaryKey: 'id',
  properties: {
    id: 'int',
    productId: { type: 'int', optional: true },
    partnumber: { type: 'string', optional: true },
    export: { type: 'string', optional: true },
    year: { type: 'int', optional: true },
    country: { type: 'string', optional: true },
    language: { type: 'string', optional: true },
    createdAt: { type: 'string', optional: true },
    data: { type: 'string', optional: true },
    productName: { type: 'string', optional: true },
    businessUnit: { type: 'string', optional: true },
    productType: { type: 'string', optional: true },
  }
};

export default productDetailsSchema;
