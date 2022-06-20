import Config from 'react-native-config';
import * as globals from '../libs/globals';
import { saveUniversalDb } from '../../realm/queries';
import { getDb } from '../libs/helpers';
import { appConstants } from '..';
import { getFavourite } from '../../redux/actions';
import { store } from '../../redux/configureStrore';


const { schemas } = appConstants;

/**
 * Type: MINOR
 * Mingrations :
 * 1. Added version name in local database
 * 2. Caching of Fonts
 */
const migrateToVersion1 = () => new Promise(async (resolve) => {
  await saveUniversalDb({
    dbVersion: globals.DB_VERSION
  });
  resolve();
});

// Type: PATCH
// Mingrations :
// 1. Added version name in local database
// 2. Caching of tick image for product compare pdf
const migrateToVersion2 = () => new Promise(async (resolve) => {
  await saveUniversalDb({
    dbVersion: globals.DB_VERSION
  });
  resolve();
});

// Type: PATCH
// Mingrations :
// 1. Added analyticsTracking column in universal table in local database
const migrateToVersion4 = () => new Promise(async (resolve) => {
  await saveUniversalDb({
    dbVersion: globals.DB_VERSION
  });
  resolve();
});

// Type: MINOR
// Mingrations :
// 1. Added new tables in the Common DB productRecommendations and productRecommendationsList
const migrateToVersion5 = () => new Promise(async (resolve) => {
  await saveUniversalDb({
    dbVersion: globals.DB_VERSION
  });
  resolve();
});

// Type: MINOR
// Mingrations :
// 1. Added position column to the favouriteContent table in local data base
const migrateToVersion6 = () => new Promise(async (resolve) => {
  await saveUniversalDb({
    dbVersion: globals.DB_VERSION
  });
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const favouriteContent = realm.objects(schemas.FAVOURITE_CONTENT);
      favouriteContent.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.position = item.id * 1000;
      });
      getFavourite(store.dispatch);
      console.log('asdadas');
      resolve();
    });
  });
});

const migrationManager = () => new Promise(async (resolve) => {
  switch (globals.DB_VERSION) {
    case 1:
      await migrateToVersion1();
      resolve();
      break;

    case 2:
      await migrateToVersion2();
      resolve();
      break;

    case 4:
      await migrateToVersion4();
      resolve();
      break;

    case 5:
      await migrateToVersion5();
      resolve();
      break;

    case 6:
      await migrateToVersion6();
      resolve();
      break;

    default:
      resolve();
      break;
  }
});

export default migrationManager;
