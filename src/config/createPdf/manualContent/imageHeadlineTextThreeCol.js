/**
 * @fileoverview Image headline text with in three column section for Manual content pdf
 * @package
 */
import { getImageFromCache } from '../pdfHelpers';
import { getCard } from '../pdfLayouts';

const imageHeadlineTextThreeCol = (data) => new Promise(async (resolve) => {
  const image_left = await getImageFromCache(data, 'image_left');
  const image_middle = await getImageFromCache(data, 'image_middle');
  const image_right = await getImageFromCache(data, 'image_right');
  let str = '';
  data.forEach((item, index) => {
    str += `${getCard(image_left[index], item.headline_left, item.headlinetype_left, item.text_left)}`;
    str += `${getCard(image_middle[index], item.headline_middle, item.headlinetype_middle, item.text_middle)}`;
    str += `${getCard(image_right[index], item.headline_right, item.headlinetype_right, item.text_right)}`;
  });
  str = `<div class="card-row-wrap">
    <div class="card-wrap">
      ${str}
    </div>
  </div>`;
  resolve(str);
});

export default imageHeadlineTextThreeCol;
