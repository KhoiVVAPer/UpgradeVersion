/**
 * @fileoverview Text section for Manual content pdf
 * @package
 */
import { formatAnchorTag } from '../pdfHelpers';

const textContent = (data) => {
  let str = '';

  data.forEach((item) => {
    str += `<div class="text-content">
      ${formatAnchorTag(item.text)}
    </div>`;
  });

  return str;
};

export default textContent;
