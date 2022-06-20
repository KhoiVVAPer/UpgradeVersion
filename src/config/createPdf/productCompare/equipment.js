import tr from '../../libs/translator';
import appConstants from '../../libs/constants';

const { textCasing } = appConstants;

const getEquipmentCol = (compareData, offset, label, tickImg) => {
  if (!compareData.productDetailsArr[offset]) return '';

  const productData = compareData.productDetailsArr[offset];
  let value = '';
  productData.equipment.map((item) => {
    if (item.label === label) {
      value = item.value;
    }
    return null;
  });

  if (value === '1') {
    return `
    <div class="compare-col">
      <img src="${tickImg}">
    </div>
  `;
  }

  return `
    <div class="compare-col">
      <label>${value || '-'}</label>
    </div>
  `;
};

const equipment = (compareData, translations, tickImg) => new Promise((resolve) => {
  let str = '';
  compareData.equipmentLabels.forEach((item) => {
    str += `
      <div class="compare-row">
        <div class="compare-col">
          <label>${item}</label>
        </div>
        ${getEquipmentCol(compareData, 0, item, tickImg)}
        ${getEquipmentCol(compareData, 1, item, tickImg)}
        ${getEquipmentCol(compareData, 2, item, tickImg)}
        ${getEquipmentCol(compareData, 3, item, tickImg)}
      </div>
    `;
  });
  str = `<div class="section">
      <h4>${tr(translations, 'equipment', 'EQUIPMENT', textCasing.U)}</h4>
      <div class="compare-wrap">
        ${str}
      </div>
    </div>
  `;
  resolve(str);
});

export default equipment;
