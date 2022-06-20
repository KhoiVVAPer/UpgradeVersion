import { Platform } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as globals from '../../libs/globals';
import tr from '../../libs/translator';
import appConstants from '../../libs/constants';
import {
  getHeader,
  getFooter
} from '../pdfLayouts';
import { dimentions } from '../pdfContants';
import { setPdfDimention, getImageBase64, fontToBase64 } from '../pdfHelpers';
import styles from '../styles';

import imageSection from './imageSection';
import technicalData from './technicalData';
import equipment from './equipment';
import descriptionData from './description';

const { textCasing } = appConstants;

let htmlStr = '';

const productComparePdf = (compareData, toReturnStr) => new Promise(async (resolve) => {
  const tickImg = await getImageBase64(`${globals.IMAGE_SAVE_LOCATION}/tick.png`);
  const fontUrlArr = await fontToBase64();
  htmlStr = '';

  const translations = globals.GET_APP_DATA('translationsArr');
  const mode = compareData.productDetailsArr.length <= 2 ? dimentions.PORTRAIT : dimentions.LANDSCAPE;

  const imageSectionStr = await imageSection(compareData.productDetailsArr, translations);
  const techDataStr = technicalData(compareData, translations);
  const equipmentStr = await equipment(compareData, translations, tickImg);
  const description = descriptionData(compareData, translations);
  htmlStr += imageSectionStr;
  htmlStr += techDataStr;
  htmlStr += equipmentStr;
  htmlStr += description;

  const finalHtmlStr = ` ${getHeader(styles.productCompare, fontUrlArr)}
  <h1>${tr(translations, 'product_comparison', 'PRODUCT COMPARISON', textCasing.U)}</h1>
  ${htmlStr}
  ${getFooter()}
  `;
  if (toReturnStr) {
    resolve(finalHtmlStr);
    return finalHtmlStr;
  }

  let options = {
    html: `
      ${getHeader(styles.productCompare, fontUrlArr)}
      <h1>${tr(translations, 'product_comparison', 'PRODUCT COMPARISON', textCasing.U)}</h1>
      ${htmlStr}
      ${getFooter()}
    `,
    fileName: Platform.OS === 'ios' ? `${globals.APP_FOLDER}/ProductCompare` : 'ProductCompare',
    directory: 'Documents',
    ...setPdfDimention(mode)
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

export default productComparePdf;
