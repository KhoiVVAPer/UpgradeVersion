import { chunkArray, isEmptyObject } from '../../libs/helpers';
import { getImageFromCache } from '../pdfHelpers';

const productList = (productListArr) => new Promise(async (resolve) => {
  let imgArr = productListArr.map((productData) => {
    const url = (productData.images
      && productData.images[0]
      && productData.images[0].urls
      && productData.images[0].urls[2]
      && productData.images[0].urls[2].url) || '';
    return url;
  });
  imgArr = await getImageFromCache(imgArr);

  const productChunks = chunkArray(productListArr, 4);
  const imagesChunks = chunkArray(imgArr, 4);

  let str = '';
  productChunks.forEach((rowItem, rowIndex) => {
    str += '<div class="page-break-auto product-row">';
    rowItem.forEach((colItem, colIndex) => {
      if (!isEmptyObject(colItem)) {
        const imgUrl = imagesChunks[rowIndex][colIndex];
        str += `
          <div class="product-item">
            <img src="${imgUrl}" alt="" />
            <h4>${colItem.name}</h4>
            <p>${colItem.texts[0] && colItem.texts[0].value}</p>
          </div>
        `;
      }
    });
    str += '</div>';
  });

  str = `
    <div class="product-list-wrap">
      ${str}
    </div>
  `;
  resolve(str);
});

export default productList;
