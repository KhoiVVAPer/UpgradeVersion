/**
 * @fileoverview Ribbon section for Manual content pdf
 * @package
 */
import { formatAnchorTag } from '../pdfHelpers';

const ribbonText = (data) => new Promise((resolve) => {
  let str = '';
  data.forEach((item) => {
    const headlineStr = item.headline ? `<h1>${item.headline.toUpperCase()}</h1>` : '';
    const descStr = item.text ? `<p>${formatAnchorTag(item.text)}</p>` : '';
    str += `
    <div class="ribbon-text">
      ${headlineStr}
      ${descStr}
    </div>
  `;
  });
  resolve(str);
});

export default ribbonText;
