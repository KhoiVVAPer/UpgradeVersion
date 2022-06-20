import tr from '../../libs/translator';
import appContansts from '../../libs/constants';
import { getImageFromCache } from '../pdfHelpers';

const { textCasing } = appContansts;

const getTechData = (productData, translations) => {
  if (!productData.techdata || !productData.techdata.length) return '';
  let rowStr = '';
  productData.techdata.forEach((item) => {
    let { label } = item;
    if (item.unit) label += ` (${item.unit})`;
    rowStr += `<tr><td width="20%">${label}</td><td width="20%">${item.value}</td></tr>`;
  });
  return `<div class="bold">
    <h3>${tr(translations, 'technical_data', 'Technical Data', textCasing.U)}</h3>
    <table class="table small" style="font-weight: bold;">
      <tbody>
        ${rowStr}
      </tbody>
    </table>
  </div>`;
};

const getSection1 = (productData, translations) => new Promise(async (resolve) => {
  let imagesArr = [];
  productData.images.map((item) => {
    let fullImage = '';
    item.urls.map((imageUrl) => {
      if (imageUrl.type === 'full') fullImage = imageUrl.url;
      return null;
    });
    imagesArr = [...imagesArr, fullImage];
    return null;
  });

  let shortDesc = '';
  let longDesc = '';
  productData.texts.map((item) => {
    if (item.type === 'long') longDesc = `<p>${item.value}</p>`;
    if (item.type === 'short') shortDesc = `<p class="bold medium">${item.value}</p>`;
    return null;
  });

  const imageUrl = await getImageFromCache([imagesArr[0]]);

  const technicalDataSec = `<div class="technical-data-sec">
      ${getTechData(productData, translations)}
    </div>
  `;

  const orderNumber = `${tr(translations, 'order_number', 'Order number')}: ${productData.partnumberFormatted}`;

  const str = `<div class="medium section1" style="display: inline-flex; align-items: flex-start;">
      <img src="${imageUrl[0]}" alt="product-ima" style="width: 45%;object-fit: contain; float: left;">
      <div>
        <h1 class="bold">${productData.name}</h1>
        <p class="bold medium">${orderNumber}</p>
        ${shortDesc}
        ${longDesc}
      </div>
    </div>
    ${technicalDataSec}
  `;

  resolve(str);
});

export default getSection1;
