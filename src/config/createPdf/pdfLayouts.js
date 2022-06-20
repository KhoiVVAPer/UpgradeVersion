import moment from 'moment';
import styles from './styles';
import * as pdfContants from './pdfContants';
import { formatAnchorTag } from './pdfHelpers';

/**
 * Returns header design
 */
const getHeader = (pageStyles, fontUrlArr) => {
  const { clanProNarrBold, clanProNarrBook } = fontUrlArr;

  return `<html lang=\"en\">
    <head>
      <meta http-equiv=\"content-type\" content=\"text/html;charset=UTF-8\" />
      <style>
        ${styles.commonStyles}
        @font-face {
          font-family: "Clan Pro News";
          font-weight: bold;
          src:url("${clanProNarrBold}");
        }
        @font-face {
          font-family: "Clan Pro News";
          font-weight: normal;
          src: url("${clanProNarrBook}");
        }
        ${pageStyles}
      </style>
      </head>
      <body>
        <div id=\"page\">
          <div id=\"main\" style=\"position: relative; float: none; font-family: Clan Pro News;\">
            <div id=\"header\" class=\"row\" style=\"justify-content: space-between;\">
              <img class=\"ak-logo\" alt=\"logo\" style=\"width: 85px;height: 22px;\" src=\"data:image/png;base64,${pdfContants.logoBase64}\">
              <p style=\"font-size: 8px;\">${moment().format('DD.MM.YYYY')}</p>
            </div>
            <div style=\"margin-top: 10px; width:100%;background:gray;height: 2.5px;\"></div>`;
};

/**
 * Returns footer design
 */
const getFooter = () => {
  const str = '</div></div></body></html>';
  return str;
};

/**
 * Returns breadcrumb for the page
 * @param {Object} breadcrumbData is an array of app structure
 */
const getBreadcrumb = (breadcrumbData) => {
  const visitedPagesArr = breadcrumbData.slice(0, breadcrumbData.length - 1);
  let visitedPagesStr = '';
  if (visitedPagesArr.length) {
    visitedPagesArr.forEach((item) => {
      visitedPagesStr += item ? `${item.title} &gt; ` : '';
    });
  }
  const lastEle = breadcrumbData[breadcrumbData.length - 1] ? breadcrumbData[breadcrumbData.length - 1].title : '';
  return `<div style=\"display: flex;font-size: 9px;\ margin-top: 10px"><span>${visitedPagesStr}</span>&nbsp;<span class=\"bold\"> ${lastEle}</span></div>`;
};

/**
 * Returns page break design
 */
const pageBreak = () => `<p class=\"page-break\" style=\"text-align: right; font-size: 8px;\">${moment().format('DD.MM.YYYY')}</p>`;

/**
 * Returns card of image with headline text
 * @param {String} imgUrl is image url in card
 * @param {String} heading is heading in card
 * @param {String} headlineType is type of heading in card e.g h1, h2, h3, h4
 * @param {String} desc is descriotion in card
 */
const getCard = (imgUrl, heading, headlineType = 'h3', desc) => {
  const imgStr = imgUrl ? `<img src="${imgUrl}" alt="" srcset="">` : '';
  const headingStr = heading ? `<${headlineType}>${heading}</${headlineType}>` : '';
  const descStr = desc ? `${formatAnchorTag(desc)}` : '';
  return `
    <div class="card">
      ${imgStr}
      ${headingStr}
      ${descStr}
    </div>
  `;
};

export {
  getHeader,
  getFooter,
  getBreadcrumb,
  pageBreak,
  getCard
};
