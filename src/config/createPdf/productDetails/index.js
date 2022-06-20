import { Platform } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as globals from '../../libs/globals';
import { getBreadcrumbArr, fontToBase64 } from '../pdfHelpers';
import {
  // pageBreak,
  getHeader,
  getFooter,
  getBreadcrumb
} from '../pdfLayouts';
import styles from '../styles';

import getSection1 from './getSection1';
import getEquipment from './getEquipment';
import getIcons from './getIcons';
import featuresAndBenefits from './featuresAndBenefits';
import compatibleMachines from './compatibleMachines';
import applications from './applications';
import detergentWarnings from './detergentWarnings';
import configurableComponents from './configurableComponents';
import cleaningAgents from './cleaningAgents';
import useOrientation from './useOrientation';

const productDetailsPdf = (productData, structureData, toReturnStr) => new Promise(async (resolve) => {
  const translations = globals.GET_APP_DATA('translationsArr');
  const breadcrumbData = await getBreadcrumbArr(productData.id, structureData);
  const fontUrlArr = await fontToBase64();

  let htmlStr = '';
  htmlStr += await getSection1(productData, translations);
  htmlStr += getEquipment(productData, translations);
  htmlStr += await getIcons(productData);
  htmlStr += await featuresAndBenefits(productData, translations);
  htmlStr += compatibleMachines(productData.compatibleProducts, translations);
  htmlStr += applications(productData.applications, translations);
  htmlStr += detergentWarnings(productData.detergentWarnings, translations);
  htmlStr += configurableComponents(productData.configurableComponents, translations);
  htmlStr += cleaningAgents(productData, translations);

  const finalHtmlStr = `${getHeader(styles.productDetails, fontUrlArr)}
  ${getBreadcrumb(breadcrumbData)}
  ${htmlStr}
  ${getFooter()}
  `;
  if (toReturnStr) {
    resolve(finalHtmlStr);
    return finalHtmlStr;
  }
  let options = {
    html: finalHtmlStr,
    fileName: Platform.OS === 'ios' ? `${globals.APP_FOLDER}/productDetails` : 'productDetails',
    directory: 'Documents',
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

export default productDetailsPdf;
