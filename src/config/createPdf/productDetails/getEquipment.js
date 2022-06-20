/**
 * @fileoverview Equipment section for Manual content pdf
 * @package
 */
import tr from '../../libs/translator';
import appContansts from '../../libs/constants';

const { textCasing } = appContansts;

const getEquipment = (productData, translations) => {
  if (!productData.equipment || !productData.equipment.length) return '';
  let leftStr = '';
  let rightStr = '';

  productData.equipment.forEach((item, index) => {
    const valueDataFlag = item.value === '1';
    if (index % 2 === 0) {
      leftStr += `<tr><td>■ ${item.label} ${valueDataFlag ? '' : `, ${item.value}`}</td></tr>`;
    } else {
      rightStr += `<tr><td>■ ${item.label} ${valueDataFlag ? '' : `, ${item.value}`}</td></tr>`;
    }
  });

  return `<div class="equipment-sec">
    <h4 style="">${tr(translations, 'equipment', 'EQUIPMENT', textCasing.U)}</h4>
    <div class="line"></div><div class="row" style="justify-content: space-between;">
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

export default getEquipment;
