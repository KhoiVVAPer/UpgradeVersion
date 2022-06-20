import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save data of pages structure object into database
 * @param {Object} structureData is pages structure
 */
const saveStructureDataDb = (structureData) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      realm.create(schemas.STRUCTURE, {
        export: structureData.export,
        year: structureData.year,
        country: structureData.country,
        language: structureData.language,
        createdAt: structureData.createdAt,
        data: JSON.stringify(structureData.data)
      });
    });
  });
};

/**
 * Get list of pages structure from database
 * @return {Object} data of structure
 */
const getStructureDataDb = () => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      let structureData = realm.objects(schemas.STRUCTURE);
      structureData = Array.from(structureData);

      resolve(structureData[0] || false);
    });
  });
});

/**
 * Delete structure data from database
 * @return {Boolean} if data is deleted
 */
const deleteStructureDataDb = () => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      const structureData = realm.objects(schemas.STRUCTURE);
      realm.delete(structureData);
      resolve(true);
    });
  });
});

export {
  saveStructureDataDb,
  getStructureDataDb,
  deleteStructureDataDb
};
