import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const rootPageMetaSchema = {
  name: schemas.ROOT_PAGE_META,
  properties: {
    country: { type: 'string', optional: true },
    createdAt: { type: 'string', optional: true },
    export: { type: 'string', optional: true },
    language: { type: 'string', optional: true },
    year: { type: 'int', optional: true },
    data: { type: 'list', objectType: schemas.COUNTRY_SCHEMA },
  }
};

const countrySchema = {
  name: schemas.COUNTRY_SCHEMA,
  primaryKey: 'code',
  properties: {
    code: 'string',
    name: { type: 'string', optional: true },
    languages: { type: 'string' },
  }
};

const activeLanguageSchema = {
  name: schemas.ACTIVE_LANGUAGE,
  primaryKey: 'id',
  properties: {
    id: 'int',
    countryCode: 'string',
    countryName: 'string',
    languageCode: 'string',
    languageName: 'string'
  }
};

export {
  rootPageMetaSchema,
  countrySchema,
  activeLanguageSchema
};
