/**
 * @fileoverview Detergent Warnings section for Manual content pdf
 * @package
 */
import tr from '../../libs/translator';
import appContansts from '../../libs/constants';

const { textCasing } = appContansts;

const detergentWarnings = (detergentWarningArr, translations) => {
  if (!detergentWarningArr || !detergentWarningArr.length) return '';

  let leftStr = '';
  let rightStr = '';
  detergentWarningArr.forEach((item, index) => {
    if (index % 2 === 0) {
      leftStr += `<tr><td>■ ${item}</td></tr>`;
    } else {
      rightStr += `<tr><td>■ ${item}</td></tr>`;
    }
  });

  return `<div class="detergent-warnings-sec">
      <h4>${tr(translations, 'settings', '"DETERGENT WARNINGS & SAFETY RECOMMENDATIONS"', textCasing.U)}</h4>
      <div class="line"></div>
      <div class="row small" style="justify-content: space-around;">
        <table class="table" style="width: 49%; font-size: 10px;">
          <tbody>
            ${leftStr}
          </tbody>
        </table>
        <table class="table" style="width: 49%; font-size: 10px;">
          <tbody>
            ${rightStr}
          </tbody>
        </table>
      </div>
    </div>`;
};

export default detergentWarnings;
