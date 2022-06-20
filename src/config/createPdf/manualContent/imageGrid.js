/**
 * @fileoverview Image grid section for Manual content pdf
 * @package
 */
import { imageSavedCheck } from '../../libs/helpers';

const imageGrid = (data) => new Promise(async (resolve) => {
  const imageBig = await imageSavedCheck(data.imageBig);
  const imageSmallTop = await imageSavedCheck(data.imageSmallTop);
  const imageSmallMiddle = await imageSavedCheck(data.imageSmallMiddle);
  const imageSmallBottom = await imageSavedCheck(data.imageSmallBottom);

  const str = `
    <div class="image-grid">
      <div class="image-big">
        <img src="${imageBig}" alt="" srcset="">
        <h1>${data.headline_imageBig}</h1>
      </div>
      <div class="image-small-wrap">
        <div class="image-small">
          <img src="${imageSmallTop}" alt="" srcset="">
          <span>${data.headline_imageSmallTop}</span>
        </div>
        <div class="image-small">
          <img src="${imageSmallMiddle}" alt="" srcset="">
          <span>${data.headline_imageSmallMiddle}</span>
        </div>
        <div class="image-small">
          <img src="${imageSmallBottom}" alt="" srcset="">
          <span>${data.headline_imageSmallBottom}</span>
        </div>
      </div>
    </div>
  `;
  resolve(str);
});

export default imageGrid;
