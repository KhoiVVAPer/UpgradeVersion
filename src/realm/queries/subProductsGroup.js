import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save sub products list into database
 * @param {Int} productgroupId id proeduct group
 * @param {Object} obj is list of sub products
 */
const saveSubProductDataDb = (productgroupId, obj) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      const subProductMeta = realm.create(schemas.SUB_PRODUCT_GROUP_META, {
        productgroupId,
        export: obj.export,
        year: obj.year,
        country: obj.country,
        language: obj.language,
        createdAt: obj.createdAt,
        data: [],
      });

      obj.data.map((item) => {
        subProductMeta.data.push({
          id: item.id,
          title: item.title,
          parentId: item.parentId,
          type: item.type,
        });
        return null;
      });
    });
  });
};

/**
 * Save sub products list of multiple groups into database
 * @param {Int} productgroupIdArr id proeduct group
 * @param {Object} obj is list of sub products
 */
const saveSubProductDataArrDb = (productgroupIdArr, obj) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      productgroupIdArr.map((productgroupId) => {
        const subProductMeta = realm.create(schemas.SUB_PRODUCT_GROUP_META, {
          productgroupId,
          export: obj.export,
          year: obj.year,
          country: obj.country,
          language: obj.language,
          createdAt: obj.createdAt,
          data: [],
        });

        const arr = obj.data.filter((item) => (item.parentId === parseInt(productgroupId)));
        arr.map((item) => {
          subProductMeta.data.push({
            id: item.id,
            title: item.title,
            parentId: item.parentId,
            type: item.type,
          });
          return null;
        });
        return null;
      });
    });
  });
};

/**
 * Delete sub product group list of provided product group from databse
 * @param {Int} productgroupId is unique key of product group
 * @return {Boolean} if sub product list is deleted
 */
const deleteSubProductDataDb = (productgroupId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      const subProductMeta = realm.objects(schemas.SUB_PRODUCT_GROUP_META).filtered(`productgroupId="${productgroupId}"`);
      realm.delete(subProductMeta);

      const subProductList = realm.objects(schemas.SUB_PRODUCT_GROUP_LIST).filtered(`parentId=${productgroupId}`);
      realm.delete(subProductList);

      resolve(true);
    });
  });
});

/**
 * Delete sub product group list of multiple product group from databse
 * @param {Int} productgroupIdArr is unique key of product group
 * @return {Boolean} if sub product list is deleted
 */
const deleteSubProductDataArrDb = (productgroupIdArr) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      let metaFilterStr = '';
      let subProductFilterStr = '';
      productgroupIdArr.map((productgroupId, index) => {
        const suffix = productgroupIdArr.length === (index + 1) ? '' : ' OR ';
        metaFilterStr = `${metaFilterStr} productgroupId="${productgroupId}" ${suffix}`;
        subProductFilterStr = `${subProductFilterStr} parentId="${productgroupId}" ${suffix}`;
        return null;
      });
      const subProductMeta = realm.objects(schemas.SUB_PRODUCT_GROUP_META).filtered(metaFilterStr);
      realm.delete(subProductMeta);

      const subProductList = realm.objects(schemas.SUB_PRODUCT_GROUP_LIST).filtered(subProductFilterStr);
      realm.delete(subProductList);

      resolve(true);
    });
  });
});

/**
 * Get list of sub products of provided product group
 * @param {Int} productgroupId is unique key of product group
 * @return {Object} sub product list
 */
const getSubProductDataDb = (productgroupId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      let subProductMeta = realm.objects(schemas.SUB_PRODUCT_GROUP_META).filtered(`productgroupId="${productgroupId}"`);
      subProductMeta = Array.from(subProductMeta);

      if (!subProductMeta[0]) resolve(undefined);

      if (subProductMeta[0]) {
        let subProductList = realm.objects(schemas.SUB_PRODUCT_GROUP_LIST).filtered(`parentId=${productgroupId}`);
        subProductList = Array.from(subProductList);

        // eslint-disable-next-line arrow-body-style
        subProductList = subProductList.map((item) => {
          return { ...item };
        });

        const subProductGroupData = { ...subProductMeta[0] };
        subProductGroupData.data = subProductList;

        resolve([subProductGroupData]);
      }
    });
  });
});

/**
 * Get list of sub products of multiple product group
 * @param {Int} productgroupIdArr is unique key of product group
 * @return {Object} sub product list
 */
const getSubProductDataArrDb = (productgroupIdArr) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      let metaFilterStr = '';
      let subProductFilterStr = '';
      productgroupIdArr.map((productgroupId, index) => {
        const suffix = productgroupIdArr.length === (index + 1) ? '' : ' OR ';
        metaFilterStr = `${metaFilterStr} productgroupId="${productgroupId}" ${suffix}`;
        subProductFilterStr = `${subProductFilterStr} parentId="${productgroupId}" ${suffix}`;
        return null;
      });

      let subProductMeta = realm.objects(schemas.SUB_PRODUCT_GROUP_META).filtered(metaFilterStr);
      subProductMeta = Array.from(subProductMeta);

      if (!subProductMeta[0]) resolve(undefined);

      if (subProductMeta[0]) {
        let subProductList = realm.objects(schemas.SUB_PRODUCT_GROUP_LIST).filtered(subProductFilterStr);
        subProductList = Array.from(subProductList);

        // eslint-disable-next-line arrow-body-style
        subProductList = subProductList.map((item) => {
          return { ...item };
        });

        const subProductGroupDataArr = [];

        subProductMeta.map((mataItem) => {
          let obj = {};
          const arr = subProductList.filter((subProductItem) => (subProductItem.parentId === parseInt(mataItem.productgroupId)));
          obj = {
            ...mataItem,
            data: arr
          };
          subProductGroupDataArr.push(obj);
          return null;
        });

        resolve(subProductGroupDataArr);
      }
    });
  });
});

export {
  saveSubProductDataDb,
  saveSubProductDataArrDb,
  deleteSubProductDataDb,
  deleteSubProductDataArrDb,
  getSubProductDataDb,
  getSubProductDataArrDb
};
