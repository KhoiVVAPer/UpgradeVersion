import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save product recommendations into database
 * @param {Int} recommendationsId is unique id of product
 * @param {Object} listData is data of product
 */
const saveProductRecommendationsDb = (recommendationsId, listData, partNumber) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      let id = realm.objects(schemas.PRODUCT_RECOMMENDATIONS).max('id');
      id = id ? id + 1 : 1;
      realm.create(schemas.PRODUCT_RECOMMENDATIONS, {
        id,
        partNumber,
        recommendationsId: recommendationsId.toLowerCase(),
        country: listData.country,
        language: listData.language,
        data: listData.data,
      });
    });
  });
};

/**
 * Get data of product recommendations for provided recommendationsId
 * @param {Int} recommendationsId is unique id of product
 * @return {Object} product data
 */
const getProductRecommendationsDb = (recommendationsId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    let productRecommendationsListData = realm.objects(schemas.PRODUCT_RECOMMENDATIONS).filtered(`recommendationsId="${recommendationsId.toLowerCase()}"`);
    productRecommendationsListData = Array.from(productRecommendationsListData);
    if (productRecommendationsListData.length < 1) {
      resolve(false);
      return;
    }
    productRecommendationsListData = productRecommendationsListData.map((productRecommendationsListDataList) => {
      let data = Array.from(productRecommendationsListDataList.data);

      data = data.map((recommendations) => {
        const obj = { ...recommendations };
        return obj;
      });

      return { ...productRecommendationsListDataList, data };
    });

    productRecommendationsListData = { ...productRecommendationsListData[0] };
    resolve(productRecommendationsListData);
  });
});

/**
 * Delete product recommendations details
 * @param {Int} recommendationsId is unique id of product
 * @return {Boolean} if product is deleted
 */
const deleteProductRecommendationDb = (recommendationsId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      const productRecommendationsList = realm.objects(schemas.PRODUCT_RECOMMENDATIONS).filtered(`recommendationsId="${recommendationsId.toLowerCase()}"`);
      realm.delete(productRecommendationsList);
      resolve(true);
    });
  });
});

export {
  saveProductRecommendationsDb,
  getProductRecommendationsDb,
  deleteProductRecommendationDb,
};
