import { Platform } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as globals from '../../libs/globals';
import appConstants from '../../libs/constants';
import { getBreadcrumbArr, fontToBase64 } from '../pdfHelpers';
import {
  getHeader,
  getFooter,
  getBreadcrumb
} from '../pdfLayouts';
import styles from '../styles';

import ribbonText from './ribbonText';
import fullWidthImage from './fullWidthImage';
import headlineText from './headlineText';
import imageHeadlineText from './imageHeadlineText';
import imageHeadlineTextTwoCol from './imageHeadlineTextTwoCol';
import imageHeadlineTextThreeCol from './imageHeadlineTextThreeCol';
import imageHeadlineTextFourCol from './imageHeadlineTextFourCol';
import imageHeadlineTextFiftyFifty from './imageHeadlineTextFiftyFifty';
import imageGrid from './imageGrid';
import horizontalRule from './horizontalRule';
import textContent from './textContent';
import tableContent from './tableContent';

const { layouts } = appConstants;

let htmlStr = '';

const getLayout = (layoutData) => new Promise(async (resolve) => {
  let data;
  switch (layoutData.layout) {
    case layouts.TEXT_CONTENT:
      data = textContent(layoutData.values);
      resolve(data);
      break;

    case layouts.RIBBON:
      data = await ribbonText(layoutData.values);
      resolve(data);
      break;

    case layouts.HEADLINE_TEXT:
      data = await headlineText(layoutData.values);
      resolve(data);
      break;

    case layouts.IMAGE_HEADLINE_TEXT:
      data = await imageHeadlineText(layoutData.values);
      resolve(data);
      break;

    case layouts.IMAGE_HEADLINE_TEXT_FIFTY_FIFTY:
      data = await imageHeadlineTextFiftyFifty(layoutData.values);
      resolve(data);
      break;

    case layouts.FULLWIDTHIMAGE:
      data = await fullWidthImage(layoutData.values);
      resolve(data);
      break;

    case layouts.IMAGEHEADLINETEXTTWOCOL:
      data = await imageHeadlineTextTwoCol(layoutData.values);
      resolve(data);
      break;

    case layouts.IMAGEHEADLINETEXTTHREECOL:
      data = await imageHeadlineTextThreeCol(layoutData.values);
      resolve(data);
      break;

    case layouts.IMAGEHEADLINETEXTFOURCOL:
      data = await imageHeadlineTextFourCol(layoutData.values);
      resolve(data);
      break;

    case layouts.HORIZOANTAL_RULE:
      data = horizontalRule();
      resolve(data);
      break;

    case layouts.IMAGE_COLLECTION:
      data = await imageGrid(layoutData.values[0]);
      resolve(data);
      break;

    case layouts.TABLE:
      data = tableContent(layoutData.values[0]);
      resolve(data);
      break;

    default:
      resolve('');
  }
});

const buildHtmlString = (manualContent) => new Promise((resolve) => {
  const buildLayout = async (index) => {
    const item = manualContent[index];
    const layoutData = item.config ? JSON.parse(item.config) : '';
    htmlStr += layoutData ? await getLayout(layoutData) : '';

    if (manualContent.length === (index + 1)) {
      resolve();
    } else {
      buildLayout((index + 1));
    }
  };
  buildLayout(0);
});

const manualContentPdf = (manualContent, structureData, pageId, toReturnStr) => new Promise(async (resolve) => {
  const breadcrumbData = await getBreadcrumbArr(pageId, structureData);
  const fontUrlArr = await fontToBase64();

  htmlStr = '';

  await buildHtmlString(manualContent);

  const finalHtmlStr = `
  ${getHeader(styles.manualContent, fontUrlArr)}
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
      ${getHeader(styles.manualContent, fontUrlArr)}
      ${getBreadcrumb(breadcrumbData)}
      ${htmlStr}
      ${getFooter()}
    `,
    fileName: Platform.OS === 'ios' ? `${globals.APP_FOLDER}/manualContent` : 'manualContent',
    directory: 'Documents',
  };
  if (Platform.OS === 'ios') {
    options = {
      ...options,
      padding: 0,
      bgColor: '#FFFFFF'
    };
  }

  const file = await RNHTMLtoPDF.convert(options);
  FileViewer.open(file.filePath)
    .then(() => {
      resolve();
    }).catch(() => { });
  return false;
});

export default manualContentPdf;
