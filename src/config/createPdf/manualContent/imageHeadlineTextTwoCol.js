/**
 * @fileoverview Image headline text with in two column section for Manual content pdf
 * @package
 */
import { getImageFromCache } from '../pdfHelpers';
import { getCard } from '../pdfLayouts';

const imageHeadlineTextTwoCol = (data) => new Promise(async (resolve) => {
  const image_left = await getImageFromCache(data, 'image_left');
  const image_right = await getImageFromCache(data, 'image_right');

  let str = '';
  data.forEach((item, index) => {
    str += `${getCard(image_left[index], item.headline_left, item.headlinetype_left, item.text_left)}`;
    str += `${getCard(image_right[index], item.headline_right, item.headlinetype_right, item.text_right)}`;
  });

  str = `<div class="card-row-wrap">
    <div class="card-wrap">
      ${str}
    </div>
  </div>`;
  resolve(str);
});

export default imageHeadlineTextTwoCol;
