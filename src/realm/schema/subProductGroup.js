import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const subProductGroupMetaSchema = {
  name: schemas.SUB_PRODUCT_GROUP_META,
  primaryKey: 'productgroupId',
  properties: {
    productgroupId: 'string',
    export: 'string',
    year: 'int',
    country: 'string',
    language: 'string',
    createdAt: 'string',
    data: { type: 'list', objectType: schemas.SUB_PRODUCT_GROUP_LIST },
  }
};

const subProductGroupListSchema = {
  name: schemas.SUB_PRODUCT_GROUP_LIST,
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    parentId: 'int',
    type: 'string'
  }
};

export { subProductGroupMetaSchema, subProductGroupListSchema };
