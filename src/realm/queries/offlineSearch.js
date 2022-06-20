import Realm from 'realm';
import { appConstants } from '../../config';
import {
  PROFESSIONAL_DB_OPTIONS,
  HOME_AND_GARDEN_DB_OPTIONS,
} from '..';

const {
  schemas,
  searchTabs
} = appConstants;

const tabTypes = {
  hg: 'hg',
  pro: 'pro',
  accessories: 'accessories',
  detergents: 'detergents',
  content: 'content',
};

const getProducts = (catType, key) => new Promise((resolve) => {
  Realm.open(catType).then((realm) => {
    let arr = realm.objects(schemas.PRODUCT_DETAILS).filtered(`productName CONTAINS[c] '${key}' || partnumber CONTAINS[c] '${key}'`);
    arr = Array.from(arr);
    arr = arr.map((item) => ({ ...item }));
    resolve(arr);
  });
});

const globalSearch = (key) => new Promise(async (resolve) => {
  let hgProducts = [];
  let proProducts = [];
  let accProducts = [];
  let detProducts = [];

  const response = {
  };

  searchTabs.map((item) => {
    response[item.key] = {
      doc_count: 0,
      items: []
    };
    return null;
  });

  let arr1 = [];
  let arr2 = [];

  hgProducts = await getProducts(HOME_AND_GARDEN_DB_OPTIONS, key);
  proProducts = await getProducts(PROFESSIONAL_DB_OPTIONS, key);

  hgProducts = hgProducts.map((item) => (JSON.parse(item.data)));
  proProducts = proProducts.map((item) => (JSON.parse(item.data)));

  arr1 = hgProducts.filter((item) => ((item.productType === 'accessory')));
  arr2 = proProducts.filter((item) => ((item.productType === 'accessory')));
  accProducts = [...arr1, ...arr2];

  arr1 = hgProducts.filter((item) => ((item.productType === 'detergent')));
  arr2 = proProducts.filter((item) => ((item.productType === 'detergent')));
  detProducts = [...arr1, ...arr2];

  hgProducts = hgProducts.filter((item) => ((item.productType !== 'accessory' && item.productType !== 'detergent')));
  proProducts = proProducts.filter((item) => ((item.productType !== 'accessory' && item.productType !== 'detergent')));

  const responseArr = [
    { type: tabTypes.hg, arr: hgProducts },
    { type: tabTypes.pro, arr: proProducts },
    { type: tabTypes.accessories, arr: accProducts },
    { type: tabTypes.detergents, arr: detProducts }
  ];

  responseArr.map((resItem) => {
    response[resItem.type].doc_count = resItem.arr.length;
    response[resItem.type].items = resItem.arr.map((item) => ({
      _source: {
        id: item.id,
        name: item.name,
        partnumber: item.partnumber,
        partnumberFormatted: item.partnumberFormatted,
        images: item.images
      }
    }));
    return null;
  });
  resolve(response);
});

export default globalSearch;
