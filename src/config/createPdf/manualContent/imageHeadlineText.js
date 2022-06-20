/**
 * @fileoverview Image headline text section for Manual content pdf
 * @package
 */
import { getImageFromCache, formatAnchorTag } from '../pdfHelpers';

const imageHeadlineText = (data) => new Promise(async (resolve) => {
  const imageUrlArr = await getImageFromCache(data, 'image');

  let str = '<div class="image-headline-text-wrap">';

  data.forEach((item, index) => {
    const headlineStr = item.headline ? `<h3>${item.headline}</h3>` : '';
    const descStr = item.text ? `<p>${formatAnchorTag(item.text)}</p>` : '';

    str += `
      <div class="card-wrap">
        <div class="card">
          <img src="${imageUrlArr[index]}" alt="" srcset="">
          ${headlineStr}
          ${descStr}
        </div>
      </div>
    `;
  });

  str += '</div>';

  resolve(str);
});

export default imageHeadlineText;
