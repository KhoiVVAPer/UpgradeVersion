import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const productGroupSchema = {
  name: schemas.PRODUCT_GROUP,
  primaryKey: 'productgroupId',
  properties: {
    productgroupId: 'int',
    export: { type: 'string', optional: true },
    year: 'int',
    country: { type: 'string', optional: true },
    language: { type: 'string', optional: true },
    createdAt: { type: 'string', optional: true },
    isDropdownAvailable: { type: 'bool', optional: true },
    dropdown: { type: 'string', optional: true },
    data: { type: 'list', objectType: schemas.PRODUCT_GROUP_LIST },
  }
};

const productGroupListSchema = {
  name: schemas.PRODUCT_GROUP_LIST,
  properties: {
    productgroupId: 'int',
    id: 'string',
    parentId: { type: 'string', optional: true },
    name: { type: 'string' },
    texts: { type: 'string' }
  }
};

export {
  productGroupSchema,
  productGroupListSchema
};
