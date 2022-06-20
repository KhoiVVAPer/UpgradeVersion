import { Platform } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as globals from '../../libs/globals';
import {
  getHeader,
  getFooter,
  getBreadcrumb
} from '../pdfLayouts';
import { fontToBase64, getBreadcrumbArr } from '../pdfHelpers';
import styles from '../styles';

import ribbonData from './ribbon';
import productGroupList from './productGroupList';

let htmlStr = '';

const productGroupListPdf = (productGroupListData, pageId, structureData, toReturnStr) => new Promise(async (resolve) => {
  const fontUrlArr = await fontToBase64();
  const breadcrumbData = await getBreadcrumbArr(pageId, structureData);
  htmlStr = '';
  htmlStr += ribbonData(productGroupListData);
  htmlStr += await productGroupList(productGroupListData.productGroupListArr, productGroupListData.subProductGroupList);

  const finalHtmlStr = ` ${getHeader(styles.productList, fontUrlArr)}
  ${getBreadcrumb(breadcrumbData)}
  ${htmlStr}
  ${getFooter()}
  `;
  if (toReturnStr) {
    resolve(finalHtmlStr);
    return finalHtmlStr;
  }

  let options = {
    html: `
      ${getHeader(styles.productList, fontUrlArr)}
      ${getBreadcrumb(breadcrumbData)}
      ${htmlStr}
      ${getFooter()}
    `,
    fileName: Platform.OS === 'ios' ? `${globals.APP_FOLDER}/ProductList` : 'ProductList',
    directory: 'Documents'
  };
  if (Platform.OS === 'ios') {
    options = {
      ...options,
      padding: 0,
      bgColor: '#fff'
    };
  }

  const file = await RNHTMLtoPDF.convert(options);
  FileViewer.open(file.filePath)
    .then(() => {
      resolve();
    }).catch(() => { });
  return false;
});

export default productGroupListPdf;
