import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save product details into database
 * @param {Int} productId is unique id of product
 * @param {Object} listData is data of product
 */
const saveProductDetailsDb = (productId, listData) => {
  getDb(false, productId).then((realm) => {
    realm.write(() => {
      let id = realm.objects(schemas.PRODUCT_DETAILS).max('id');
      id = id ? id + 1 : 1;

      const productDetailsObj = JSON.parse(listData.data);
      realm.create(schemas.PRODUCT_DETAILS, {
        id,
        productId,
        partnumber: String(productDetailsObj.partnumber),
        export: listData.export,
        year: listData.year,
        country: listData.country,
        language: listData.language,
        createdAt: listData.createdAt,
        data: listData.data,
        productName: listData.data ? JSON.parse(listData.data).name : ''
      });
    });
  });
};

/**
 * Get data of product for provided productId
 * @param {Int} productId is unique id of product
 * @return {Object} product data
 */
const getProductDetailsDb = (productId) => new Promise((resolve) => {
  getDb(false, productId).then((realm) => {
    let productListData = realm.objects(schemas.PRODUCT_DETAILS).filtered(`productId=${productId}`);
    productListData = Array.from(productListData);
    if (productListData.length < 1) {
      resolve(false);
      return;
    }

    productListData = { ...productListData[0] };
    resolve(productListData);
  });
});

/**
 * Get data of product for provided order number
 * @param {Int} partnumberFormatted is unique id of product
 * @return {Object} product data
 */
const getProductDetailsByPartNoDb = (partnumber, db) => new Promise((resolve) => {
  getDb(db).then((realm) => {
    let productListData = realm.objects(schemas.PRODUCT_DETAILS).filtered(`partnumber="${partnumber}"`);
    productListData = Array.from(productListData);
    if (productListData.length < 1) {
      resolve(false);
      return;
    }

    productListData = { ...productListData[0] };
    resolve(productListData);
  });
});

/**
 * Get data of product for rootline
 * @param {Int} id id to finde in rootline for products
 * @return {Object} product data
 */
const getProductDetailsByRootline = (id) => new Promise(async (resolve) => {
  const rootlineId = parseInt(id);

  const getData = (db, rootlineDataId) => new Promise(async (resolveData) => {
    getDb(db).then((realm) => {
      let productListData = realm.objects(schemas.PRODUCT_DETAILS).filtered(`data CONTAINS '"id":${rootlineDataId}'`);
      productListData = Array.from(productListData);

      if (productListData.length < 1) {
        resolveData([]);
        return;
      }
      productListData = productListData.map((item) => {
        const itemFormatted = { ...item };
        return JSON.parse(itemFormatted.data);
      });
      resolveData(productListData);
    });
  });

  const hgProducts = await getData(Config.HOME_AND_GARDEN_DATABASE, rootlineId);
  const proProducts = await getData(Config.PROFESSIONAL_DATABASE, rootlineId);
  const products = [...hgProducts, ...proProducts];
  resolve(products);
});

/**
 * Delete product details
 * @param {Int} productId is unique id of product
 * @return {Boolean} if product is deleted
 */
const deleteProductDetailsDb = (productId) => new Promise((resolve) => {
  getDb(false, productId).then((realm) => {
    realm.write(() => {
      const productList = realm.objects(schemas.PRODUCT_DETAILS).filtered(`productId=${productId}`);
      realm.delete(productList);
      resolve(true);
    });
  });
});

export {
  saveProductDetailsDb,
  getProductDetailsDb,
  getProductDetailsByPartNoDb,
  deleteProductDetailsDb,
  getProductDetailsByRootline
};
