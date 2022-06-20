/**
 * @fileoverview Full width image section for Manual content pdf
 * @package
 */
import { getImageFromCache } from '../pdfHelpers';

const fullWidthImage = (data) => new Promise(async (resolve) => {
  const imageUrlArr = await getImageFromCache(data, 'image');

  let str = '<div class="full-img-wrap">';

  data.forEach((item, index) => {
    str += `<img
      src="${imageUrlArr[index]}"
      alt=""
      srcset=""
      class="full-img"
    >`;
  });

  str += '</div>';

  resolve(str);
});

export default fullWidthImage;
