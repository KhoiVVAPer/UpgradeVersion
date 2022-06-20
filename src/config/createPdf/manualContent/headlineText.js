/**
 * @fileoverview Headline text section for Manual content pdf
 * @package
 */
import { formatAnchorTag } from '../pdfHelpers';

const headlineText = (data) => new Promise((resolve) => {
  let str = '';
  data.forEach((item) => {
    const headlineStr = item.headline ? `<h1>${item.headline}</h1>` : '';
    const descStr = item.text ? `<p>${item.text}</p>` : '';
    str += `
    <div class="headline-text">
      ${headlineStr}
      ${formatAnchorTag(descStr)}
    </div>
  `;
  });
  resolve(str);
});

export default headlineText;
