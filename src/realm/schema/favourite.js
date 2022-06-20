import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const favouriteFolder = {
  name: schemas.FAVOURITE_FOLDER,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', optional: true },
    parentId: { type: 'int', optional: true },
    folderName: { type: 'string', optional: true },
  }
};

const favouriteContent = {
  name: schemas.FAVOURITE_CONTENT,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', optional: true },
    folderId: { type: 'int', optional: true },
    pageId: { type: 'int', optional: true },
    title: { type: 'string', optional: true },
    type: { type: 'string', optional: true },
    countryId: { type: 'string', optional: true },
    languageId: { type: 'string', optional: true },
    Year: { type: 'int', optional: true },
    position: { type: 'double', optional: true },
  }
};

export { favouriteFolder, favouriteContent };
