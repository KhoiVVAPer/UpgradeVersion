import { chunkArray, isEmptyObject } from '../../libs/helpers';
import { getImageFromCache } from '../pdfHelpers';

const productGroupList = (productGroupListArr, subProductGroupList) => new Promise(async (resolve) => {
  let imgArr = productGroupListArr.map((productGroupData) => {
    const url = (productGroupData.texts
      && Array.isArray(productGroupData.texts)
      && productGroupData.texts[0]
      && productGroupData.texts[0].images
      && Array.isArray(productGroupData.texts[0].images)
      && productGroupData.texts[0].images[2]
      && productGroupData.texts[0].images[2].url) || '';
    return url;
  });
  imgArr = await getImageFromCache(imgArr);

  const productChunks = chunkArray(productGroupListArr, 4);
  const imagesChunks = chunkArray(imgArr, 4);
  let str = '';
  productChunks.forEach((rowItem, rowIndex) => {
    str += '<div class="page-break-auto product-row">';
    rowItem.forEach((colItem, colIndex) => {
      const layoutId = colItem.id.toString();
      let subProductGroup = '';
      if (!(!subProductGroupList[layoutId]
        || subProductGroupList[layoutId].loading
        || subProductGroupList[layoutId].error)) {
        subProductGroupList[layoutId].obj.data.forEach((item) => { subProductGroup += `<h5>> ${item.title}</h5>`; });
      }

      if (!isEmptyObject(colItem)) {
        const imgUrl = imagesChunks[rowIndex][colIndex];
        str += `
          <div class="product-item">
            <img class="product-group-img" src="${imgUrl}" alt="" />
            <h4>${colItem.name}</h4>
            <p>${colItem.texts[1] && colItem.texts[1].text}</p>
            ${subProductGroup}
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

export default productGroupList;
