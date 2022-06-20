import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import { appConstants, globals } from '../../config';

const { schemas } = appConstants;

/**
 * Save page as favourite
 * @param {Object} dataObj is data of favourite page
 * @return {Boolean} page is saved as favourite
 */
const saveFavouriteContentDb = (dataObj) => new Promise((resolve) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      let folderContentId = realm.objects(schemas.FAVOURITE_CONTENT).max('id');
      let lastPosition = realm.objects(schemas.FAVOURITE_CONTENT).max('position');
      lastPosition = lastPosition ? lastPosition + 1000 : 1000;
      folderContentId = folderContentId ? folderContentId + 1 : 1;
      realm.create(schemas.FAVOURITE_CONTENT, {
        id: folderContentId,
        folderId: dataObj.activeFolderId,
        pageId: dataObj.pageId,
        title: dataObj.title,
        type: dataObj.type,
        countryId: activeLanguageData.countryCode,
        languageId: activeLanguageData.languageCode,
        Year: globals.CURRENT_YEAR,
        position: lastPosition
      });
      resolve(true);
    });
  });
});

/**
 * Edit saved favourite page
 * @param {Object} dataObj is data of favourite page
 * @return {Boolean} returns if favourite page is edited
 */
const editFavouriteContentDb = (dataObj) => new Promise((resolve) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const favouriteContent = realm.objects(schemas.FAVOURITE_CONTENT).filtered(`id=${dataObj.favouriteId}`);
      favouriteContent[0].folderId = dataObj.activeFolderId;
      favouriteContent[0].title = dataObj.title;
      favouriteContent[0].type = dataObj.type;
      favouriteContent[0].countryId = activeLanguageData.languageCode;
      favouriteContent[0].languageId = activeLanguageData.countryCode;
      favouriteContent[0].Year = globals.CURRENT_YEAR;
      resolve(true);
    });
  });
});

/**
 * Edit saved favourite page
 * @param {Object} dataObj is data of favourite page
 * @return {Boolean} returns if favourite page is edited
 */
const updatePositionFavouriteContentDb = (dataObj) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const favouriteContent = realm.objects(schemas.FAVOURITE_CONTENT).filtered(`id=${dataObj.favouriteId}`);
      favouriteContent[0].position = dataObj.position;
      resolve(true);
    });
  });
});

/**
 * Edit saved favourite page
 * @param {Object} folderData is id and name of favourite folder
 * @return {Boolean} returns if favourite page is edited
 */
const editFavouriteFolderDb = (folderData) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const favouriteFolder = realm.objects(schemas.FAVOURITE_FOLDER).filtered(`id=${folderData.id}`);
      favouriteFolder[0].folderName = folderData.folderName;
      resolve(true);
    });
  });
});

/**
 * Save folder on favourite page
 * @param {Object} dataObj is data of favourite folder
 * @return {Boolean} returns if favourite folder is saved
 */
const saveFavouriteFolderDb = (dataObj) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      let folderFolderId = realm.objects(schemas.FAVOURITE_FOLDER).max('id');
      folderFolderId = folderFolderId ? folderFolderId + 1 : 1;
      realm.create(schemas.FAVOURITE_FOLDER, {
        id: folderFolderId,
        parentId: dataObj.parentId,
        folderName: dataObj.folderName,
      });
      resolve(true);
    });
  });
});

/**
 * Get list of favouerite pages and folders
 * @return {Object} retuens saved favouerite pages and folders
 */
const getFavouriteDb = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      let favouriteFolder = realm.objects(schemas.FAVOURITE_FOLDER);
      favouriteFolder = Array.from(favouriteFolder);
      // eslint-disable-next-line arrow-body-style
      favouriteFolder = favouriteFolder.map((item) => {
        return { ...item };
      });

      let favouriteContent = realm.objects(schemas.FAVOURITE_CONTENT).sorted('position');
      favouriteContent = Array.from(favouriteContent);
      // eslint-disable-next-line arrow-body-style
      favouriteContent = favouriteContent.map((item) => {
        return { ...item };
      });
      favouriteFolder.reverse();
      resolve({
        favouriteFolder,
        favouriteContent
      });
    });
  });
});

/**
 * Delete favourite page from respective folder
 * @return {Boolean} if api is saved or not
 */
const deleteFolderContentDb = (id = null, pageId = null) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      if (pageId) {
        const favouriteContent = realm.objects(schemas.FAVOURITE_CONTENT).filtered(`pageId=${pageId}`);
        realm.delete(favouriteContent);
      } else {
        const favouriteContent = realm.objects(schemas.FAVOURITE_CONTENT).filtered(`id=${id}`);
        realm.delete(favouriteContent);
      }
      resolve(true);
    });
  });
});

/**
 * Delete favourite folder and respective folder content
 * @return {Boolean} if api is saved or not
 */
const deleteFolderDb = (id) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const favouriteFolder = realm.objects(schemas.FAVOURITE_FOLDER).filtered(`id=${id} OR parentId=${id}`);
      const favouriteFolderArr = Array.from(favouriteFolder);
      let folderIdArr = [];
      if (favouriteFolderArr) {
        favouriteFolderArr.forEach((item) => {
          folderIdArr = [...folderIdArr, item.id];
        });
      }

      let queryStr = folderIdArr.length ? folderIdArr.join(' OR folderId=') : '';
      queryStr = queryStr ? `folderId=${queryStr}` : '';
      const favouriteContent = realm.objects(schemas.FAVOURITE_CONTENT).filtered(`${queryStr}`);
      realm.delete(favouriteContent);

      realm.delete(favouriteFolder);
      resolve(true);
    });
  });
});

/**
 * Duplicate favourite folder and respective folder content
 * @return {Boolean} if api is saved or not
 */
const duplicateFolderDb = (folderData, folderName) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const favouriteFolder = realm.objects(schemas.FAVOURITE_FOLDER).filtered(`id=${folderData.id} OR parentId=${folderData.id}`);
      const favouriteFolderArr = Array.from(favouriteFolder);

      const duplicateFolderIdObj = { [folderData.parentId]: folderData.parentId };
      let duplicateFolderIdArr = [];
      let originalFolderIdArr = [];

      favouriteFolderArr.forEach((item) => {
        const favFolderItem = { ...item };

        let folderFolderId = realm.objects(schemas.FAVOURITE_FOLDER).max('id');
        folderFolderId = folderFolderId ? folderFolderId + 1 : 1;
        realm.create(schemas.FAVOURITE_FOLDER, {
          id: folderFolderId,
          parentId: favFolderItem.parentId,
          folderName: folderData.id === favFolderItem.id ? folderName : favFolderItem.folderName,
        });

        originalFolderIdArr = [...originalFolderIdArr, favFolderItem.id];
        duplicateFolderIdArr = [...duplicateFolderIdArr, folderFolderId];
        duplicateFolderIdObj[favFolderItem.id] = folderFolderId;
      });

      duplicateFolderIdArr.forEach((item) => {
        const favFolder = realm.objects(schemas.FAVOURITE_FOLDER).filtered(`id=${item}`);
        favFolder[0].parentId = duplicateFolderIdObj[favFolder[0].parentId];
      });

      originalFolderIdArr.forEach((item) => {
        let folderContentList = realm.objects(schemas.FAVOURITE_CONTENT).filtered(`folderId=${item}`);
        folderContentList = Array.from(folderContentList);

        folderContentList.forEach((contentItem) => {
          const dataObj = { ...contentItem };

          let folderContentId = realm.objects(schemas.FAVOURITE_CONTENT).max('id');
          let lastPosition = realm.objects(schemas.FAVOURITE_CONTENT).max('position');
          lastPosition = lastPosition ? lastPosition + 1000 : 1000;
          folderContentId = folderContentId ? folderContentId + 1 : 1;
          realm.create(schemas.FAVOURITE_CONTENT, {
            id: folderContentId,
            folderId: duplicateFolderIdObj[dataObj.folderId],
            pageId: dataObj.pageId,
            title: dataObj.title,
            type: dataObj.type,
            countryId: dataObj.countryId,
            languageId: dataObj.languageId,
            Year: dataObj.Year,
            position: lastPosition
          });
        });
      });
      resolve(true);
    });
  });
});

const importFavouriteDb = (favData) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const duplicateFolderIdObj = { };
      let duplicateFolderIdArr = [];

      favData.forEach((favItem) => {
        let folderFolderId;
        if (favItem.id === 0 && favItem.parentId === 0) {
          folderFolderId = 0;
        } else {
          folderFolderId = realm.objects(schemas.FAVOURITE_FOLDER).max('id');
          folderFolderId = folderFolderId ? folderFolderId + 1 : 1;
          realm.create(schemas.FAVOURITE_FOLDER, {
            id: folderFolderId,
            parentId: favItem.parentId || 0,
            folderName: favItem.folderName
          });
          duplicateFolderIdArr = [...duplicateFolderIdArr, folderFolderId];
          duplicateFolderIdObj[favItem.id] = folderFolderId;
        }

        favItem.favouriteContent.forEach((contentItem) => {
          let folderContentId = realm.objects(schemas.FAVOURITE_CONTENT).max('id');
          let lastPosition = realm.objects(schemas.FAVOURITE_CONTENT).max('position');
          lastPosition = lastPosition ? lastPosition + 1000 : 1000;
          folderContentId = folderContentId ? folderContentId + 1 : 1;

          let { type } = contentItem;
          if (type === 'productdetails') {
            type = 'productDetails';
          } else if (type === 'productlist') {
            type = 'productgrouplist';
          }
          realm.create(schemas.FAVOURITE_CONTENT, {
            id: folderContentId,
            folderId: folderFolderId,
            pageId: contentItem.pageId,
            title: contentItem.title,
            type,
            countryId: contentItem.countryId,
            languageId: contentItem.languageId,
            Year: contentItem.Year,
            position: lastPosition
          });
        });
      });

      duplicateFolderIdArr.forEach((item) => {
        const favFolder = realm.objects(schemas.FAVOURITE_FOLDER).filtered(`id=${item}`);
        favFolder[0].parentId = duplicateFolderIdObj[favFolder[0].parentId] || 0;
      });
      resolve();
    });
  });
});

export {
  saveFavouriteContentDb,
  editFavouriteContentDb,
  editFavouriteFolderDb,
  saveFavouriteFolderDb,
  getFavouriteDb,
  deleteFolderContentDb,
  deleteFolderDb,
  duplicateFolderDb,
  importFavouriteDb,
  updatePositionFavouriteContentDb
};
