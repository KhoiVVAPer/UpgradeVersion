/**
 * @fileoverview Image headline text with in four column section for Manual content pdf
 * @package
 */
import { getImageFromCache } from '../pdfHelpers';
import { getCard } from '../pdfLayouts';

const imageHeadlineTextFourCol = (data) => new Promise(async (resolve) => {
  const image_first = await getImageFromCache(data, 'image_first');
  const image_second = await getImageFromCache(data, 'image_second');
  const image_third = await getImageFromCache(data, 'image_third');
  const image_fourth = await getImageFromCache(data, 'image_fourth');

  let str = '';
  data.forEach((item, index) => {
    str += `${getCard(image_first[index], item.headline_first, item.headlinetype_first, item.text_first)}`;
    str += `${getCard(image_second[index], item.headline_second, item.headlinetype_second, item.text_second)}`;
    str += `${getCard(image_third[index], item.headline_third, item.headlinetype_third, item.text_third)}`;
    str += `${getCard(image_fourth[index], item.headline_fourth, item.headlinetype_fourth, item.text_fourth)}`;
  });
  str = `<div class="card-row-wrap">
    <div class="card-wrap">
      ${str}
    </div>
  </div>`;
  resolve(str);
});

export default imageHeadlineTextFourCol;
