/**
 * @fileoverview Image headline text with fifty-fifty width section for Manual content pdf
 * @package
 */
import { getImageFromCache, formatAnchorTag } from '../pdfHelpers';

const getImageWrap = (imageUrl) => `<div class="img-wrap">
  <img src="${imageUrl}" alt="" srcset="">
</div>`;

const imageHeadlineTextFiftyFifty = (data) => new Promise(async (resolve) => {
  const imageUrlArr = await getImageFromCache(data, 'image');

  let str = '';
  data.forEach((item, index) => {
    const headlineStr = item.headline ? `<h3>${item.headline}</h3>` : '';
    const descStr = item.text ? formatAnchorTag(item.text) : '';

    str += !item.imageRight ? getImageWrap(imageUrlArr[index]) : '';
    str += `
      <div class="desc-wrap">
        ${headlineStr}
        ${descStr}
      </div>
    `;
    str += item.imageRight ? getImageWrap(imageUrlArr[index]) : '';
  });
  str = `<div class="img-headline-fifty-fifty">
    ${str}
  </div>`;
  resolve(str);
});

export default imageHeadlineTextFiftyFifty;
