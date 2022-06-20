import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const productCompare = {
  name: schemas.PRODUCT_COMPARE,
  primaryKey: 'id',
  properties: {
    id: 'int',
    productId: 'int'
  }
};

export default productCompare;
