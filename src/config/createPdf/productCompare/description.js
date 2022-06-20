import * as helpers from '../../libs/helpers';
import tr from '../../libs/translator';
import appConstants from '../../libs/constants';

const { textCasing } = appConstants;

const descriptionDataRow = (productDetailsArr) => {
  let str = '';

  productDetailsArr.forEach((item) => {
    if (helpers.isEmptyObject(item)) {
      str += `
        <div class="compare-col">
        </div>
      `;
    } else {
      let desc = '';
      item.texts.forEach((item1) => {
        if (item1.type === 'long') desc = item1.value;
      });

      str += `
          <div class="compare-col">
            <label>${desc}</label>
          </div>
      `;
    }
  });
  return `
    <div class="compare-row" style="background-color: #fff;">
      ${str}
    </div>
  `;
};

const descriptionData = (compareData, translations) => {
  let str = '';

  let productDetailsArr = [{}, ...compareData.productDetailsArr];
  if (productDetailsArr.length === 1) {
    productDetailsArr = [{}, {}];
  }

  str += descriptionDataRow(productDetailsArr);

  return `<div class="desc-wrap">
      <h4>${tr(translations, 'description', 'DESCRIPTION', textCasing.U)}</h4>
      <div class="compare-wrap">
        ${str}
      </div>
    </div>
  `;
};

export default descriptionData;
