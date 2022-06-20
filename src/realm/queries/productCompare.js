import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Get product compare list from database
 * @return {Array} list of products which are addded for compare
 */
const getProductCompareDb = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      let products = realm.objects(schemas.PRODUCT_COMPARE);
      products = Array.from(products);
      products = products.map((item) => (item.productId));
      resolve(products);
    });
  });
});

/**
 * Delete compare product from database
 * @param {Int} productId is unique key of product
 * @return {Boolean} if compare product is deleted
 */
const deleteProductCompareDb = (productId) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const productCompare = realm.objects(schemas.PRODUCT_COMPARE).filtered(`productId=${productId}`);
      realm.delete(productCompare);
      resolve(1);
    });
  });
});

/**
 * Save product as compare into database
 * @param {Int} productId is unique key of product
 * @return {Boolean} if compare product is saved
 */
const saveProductCompareDb = (productId) => new Promise(async (resolve) => {
  const compareList = await getProductCompareDb();
  const compareObj = compareList.find((item) => (item === productId));
  if (compareObj) {
    await deleteProductCompareDb(productId);
    resolve(1);
    return;
  }
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      let id = realm.objects(schemas.PRODUCT_COMPARE).max('id');
      id = id ? id + 1 : 1;
      realm.create(schemas.PRODUCT_COMPARE, {
        id,
        productId
      });
      resolve(1);
    });
  });
});

/**
 * Save product as compare into database
 * @param {Array} productList is unique key of product
 * @return {Boolean} if compare product is saved
 */
const saveAllProductCompareDb = (productList) => new Promise(async (resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      let id = realm.objects(schemas.PRODUCT_COMPARE).max('id');
      id = id ? id + 1 : 1;
      productList.forEach((productId, index) => {
        id += index;
        realm.create(schemas.PRODUCT_COMPARE, {
          id,
          productId: parseInt(productId, 10)
        });
      });
      resolve(1);
    });
  });
});

/**
 * Delete all compare product from database
 * @return {Boolean} if compare product is deleted
 */
const deleteAllProductCompareDb = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const productCompare = realm.objects(schemas.PRODUCT_COMPARE);
      realm.delete(productCompare);
      resolve(1);
    });
  });
});

export {
  saveProductCompareDb,
  saveAllProductCompareDb,
  getProductCompareDb,
  deleteProductCompareDb,
  deleteAllProductCompareDb
};
