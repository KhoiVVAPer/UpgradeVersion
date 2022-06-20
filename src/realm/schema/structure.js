import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const structureSchema = {
  name: schemas.STRUCTURE,
  properties: {
    export: { type: 'string', optional: true },
    year: { type: 'int', optional: true },
    country: { type: 'string', optional: true },
    language: { type: 'string', optional: true },
    createdAt: { type: 'string', optional: true },
    data: { type: 'string', optional: true }
  }
};

export default structureSchema;
