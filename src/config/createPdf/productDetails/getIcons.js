/**
 * @fileoverview Icons section for Manual content pdf
 * @package
 */
import { getImageFromCache } from '../pdfHelpers';

const getIcons = (productData) => new Promise(async (resolve) => {
  if (!productData.icons || !productData.icons.length) {
    resolve('');
    return;
  }
  let imgStr = '';

  const imageUrlArr = await getImageFromCache(productData.icons, 'url');

  productData.icons.forEach((item, index) => {
    imgStr += `<img class="image-small" src="${imageUrlArr[index]}" alt="">`;
  });
  const str = `<div class="row icon-sec" style="flex-wrap: wrap;">
    ${imgStr}
  </div>`;

  resolve(str);
});

export default getIcons;
