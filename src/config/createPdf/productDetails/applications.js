/**
 * @fileoverview Application section for Manual content pdf
 * @package
 */
import tr from '../../libs/translator';
import appContansts from '../../libs/constants';

const { textCasing } = appContansts;

const applications = (applicationArr, translations) => {
  if (!applicationArr || !applicationArr.length) return '';

  let leftStr = '';
  let rightStr = '';
  applicationArr.forEach((item, index) => {
    if (index % 2 === 0) {
      leftStr += `<tr><td>■ ${item}</td></tr>`;
    } else {
      rightStr += `<tr><td>■ ${item}</td></tr>`;
    }
  });

  return `<div class="applications-sec">
      <h4>${tr(translations, 'applications', 'APPLICATIONS', textCasing.U)}</h4>
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

export default applications;
