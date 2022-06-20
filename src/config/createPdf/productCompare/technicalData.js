import tr from '../../libs/translator';
import appConstants from '../../libs/constants';

const { textCasing } = appConstants;

const technicalDataCol = (compareData, offset, label) => {
  if (!compareData.productDetailsArr[offset]) return '';

  const productData = compareData.productDetailsArr[offset];
  let value = '';
  productData.techdata.map((item) => {
    if (item.label === label) {
      value = item.value;
    }
    return null;
  });

  return `
    <div class="compare-col">
      <label>${value}</label>
    </div>
  `;
};

const technicalDataRow = (compareData) => {
  let str = '';

  compareData.techDataLabels.forEach((item) => {
    str += `
    <div class="compare-row">
      <div class="compare-col">
        <label>${item}</label>
      </div>
    `;
    str += technicalDataCol(compareData, 0, item);
    str += technicalDataCol(compareData, 1, item);
    str += technicalDataCol(compareData, 2, item);
    str += technicalDataCol(compareData, 3, item);
    str += '</div>';
  });
  return str;
};

const technicalData = (compareData, translations) => {
  let str = '';

  str += technicalDataRow(compareData);

  return `<div class="section">
    <h4>${tr(translations, 'technical_data', 'TECHNICAL DATA', textCasing.U)}</h4>
    <div class="compare-wrap">
      ${str}
    </div>
  </div>
  `;
};

export default technicalData;
