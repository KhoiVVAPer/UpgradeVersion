import { tr } from '../..';
import { getImageFromCache } from '../pdfHelpers';

const imageSection = (productDetailsArr, translations) => new Promise(async (resolve) => {
  let imgArr = productDetailsArr.map((productData) => {
    let url = '';
    productData.images[0].urls.forEach((item) => {
      if (item.type === 'full') {
        url = item.url;
      }
    });
    return url;
  });

  imgArr = await getImageFromCache(imgArr);

  let str = '';
  imgArr.forEach((item, index) => {
    const productData = productDetailsArr[index];
    str += `
      <div class="compare-col">
        <img src="${item}">
        <span class="bold">${productData.name}</span>
        <span class="bold">${tr(translations, 'order_number', 'Order Number')}: ${productData.partnumberFormatted}</span>
      </div>
    `;
  });

  str = `
    <div class="compare-row">
      <div class="compare-col"></div>
      ${str}
    </div>
  `;
  resolve(str);
});

export default imageSection;
