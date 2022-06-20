import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save product list of provided product group
 * @param {Int} productgroupId is unique id of product group
 * @param {Object} listData is list of products
 */
const saveProductListDb = (productGroupId, listData) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      let id = realm.objects(schemas.PRODUCT_LIST).max('id');
      id = id ? id + 1 : 1;
      realm.create(schemas.PRODUCT_LIST, {
        id,
        productGroupId,
        export: listData.export,
        year: listData.year,
        country: listData.country,
        language: listData.language,
        createdAt: listData.createdAt,
        productGroupData: listData.productGroupData,
        data: JSON.stringify(listData.data),
      });
    });
  });
};

/**
 * List of products for provided product group
 * @param {Int} productgroupId is unique id of product group
 * @return {Object} product list
 */
const getProductListDb = (productGroupId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    let productListData = realm.objects(schemas.PRODUCT_LIST).filtered(`productGroupId=${productGroupId}`);
    productListData = Array.from(productListData);

    if (productListData.length < 1) {
      resolve(false);
      return;
    }

    productListData = { ...productListData[0] };
    productListData.data = JSON.parse(productListData.data);

    resolve(productListData);
  });
});

/**
 * Delete product list of provided product group from database
 * @param {Int} productgroupId is unique id of product group
 * @return {Object} if product list is deleted
 */
const deleteProductListDb = (productGroupId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      const productList = realm.objects(schemas.PRODUCT_LIST).filtered(`productGroupId=${productGroupId}`);
      realm.delete(productList);
      resolve(true);
    });
  });
});

export {
  saveProductListDb,
  getProductListDb,
  deleteProductListDb
};
