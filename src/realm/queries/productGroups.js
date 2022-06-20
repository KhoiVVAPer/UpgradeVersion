import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save product group data
 * @param {Int} productgroupId is unique id of product group
 * @param {Object} dataObj is data of product group
 */
const saveProductGroupDb = (productgroupId, dataObj) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      const productGroup = realm.create(schemas.PRODUCT_GROUP, {
        productgroupId,
        export: dataObj.export,
        year: dataObj.year,
        country: dataObj.country,
        language: dataObj.language,
        createdAt: dataObj.createdAt,
        isDropdownAvailable: dataObj.isDropdownAvailable,
        dropdown: dataObj.dropdown,
        data: [],
      });

      dataObj.data.map((productGroupList) => {
        const productGroupListItem = realm.create(schemas.PRODUCT_GROUP_LIST, {
          productgroupId,
          id: productGroupList.id,
          parentId: productGroupList.parentId,
          name: productGroupList.name,
          texts: JSON.stringify(productGroupList.texts),
        });

        productGroup.data.push(productGroupListItem);
        return null;
      });
    });
  });
};

/**
 * Get list product group data
 * @param {Int} productgroupId is unique id of product group
 * @return {Object} product group list
 */
const getProductGroupDb = (productgroupId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    let productGroup = realm.objects(schemas.PRODUCT_GROUP).filtered(`productgroupId=${productgroupId}`);
    productGroup = Array.from(productGroup);

    productGroup = productGroup.map((productGroupList) => {
      let data = Array.from(productGroupList.data);

      data = data.map((productGroupText) => {
        const obj = { ...productGroupText };
        obj.texts = JSON.parse(productGroupText.texts);
        return obj;
      });

      return { ...productGroupList, data };
    });

    resolve(productGroup);
  });
});

/**
 * Delete product group of provided productgroupId
 * @param {Int} productgroupId is unique id of product group
 * @return {Boolean} if product group is deleted
 */
const deleteProductGroupDb = (productgroupId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      const productGroup = realm.objects(schemas.PRODUCT_GROUP).filtered(`productgroupId=${productgroupId}`);
      realm.delete(productGroup);
      const productGroupList = realm.objects(schemas.PRODUCT_GROUP_LIST).filtered(`productgroupId=${productgroupId}`);
      realm.delete(productGroupList);
      resolve(1);
    });
  });
});

export { saveProductGroupDb, getProductGroupDb, deleteProductGroupDb };
