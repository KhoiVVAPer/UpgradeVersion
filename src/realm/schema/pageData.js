import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const pageDataSchema = {
  name: schemas.PAGE_DATA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    pageId: 'int',
    style: { type: 'string', optional: true },
    export: { type: 'string', optional: true },
    year: 'int',
    country: { type: 'string', optional: true },
    language: { type: 'string', optional: true },
    createdAt: { type: 'string', optional: true },
    content: { type: 'list', objectType: schemas.PAGE_CONTENT },
  }
};

const pageContentSchema = {
  name: schemas.PAGE_CONTENT,
  primaryKey: 'contentId',
  properties: {
    contentId: 'int',
    pageId: 'int',
    id: 'string',
    type: 'string',
    config: 'string'
  }
};

export { pageDataSchema, pageContentSchema };
