/**
 * @fileoverview Compatible machines section for Manual content pdf
 * @package
 */
import tr from '../../libs/translator';
import appContansts from '../../libs/constants';

const { textCasing } = appContansts;

const compatibleMachines = (compatibleProducts, translations) => {
  if ((!compatibleProducts.current || !compatibleProducts.current.length) && (!compatibleProducts.past || !compatibleProducts.past.length)) return '';

  let currentWrap = '';
  let currentStr = '';
  const currentArr = ['', '', '', '', ''];
  let pastWrap = '';
  let pastStr = '';
  const pastArr = ['', '', '', '', ''];

  compatibleProducts.current.forEach((item, index) => {
    if ((index + 1) % 5 === 0) currentArr[5] += `<li>${item.name}</li>`;
    else if ((index + 1) % 4 === 0) currentArr[4] += `<li>${item.name}</li>`;
    else if ((index + 1) % 3 === 0) currentArr[3] += `<li>${item.name}</li>`;
    else if ((index + 1) % 2 === 0) currentArr[2] += `<li>${item.name}</li>`;
    else if ((index + 1) % 1 === 0) currentArr[1] += `<li>${item.name}</li>`;
  });

  currentArr.forEach((item) => {
    if (item) {
      currentStr += '<ul style="flex:1; list-style-type: none; padding-left: 0px; text-align: left">';
      currentStr += `${item}`;
      currentStr += '</ul>';
    }
  });

  if (compatibleProducts.current.length > 0) {
    currentWrap += '<div class="compatible-machines-current">';
    currentWrap += `<h4 class="small" style="padding-bottom: 10px;">${tr(translations, 'actual_machines', 'Actual Machines')}</h4>`;
    currentWrap += '<div class="row small">';
    currentWrap += `${currentStr}`;
    currentWrap += '</div>';
    currentWrap += '</div>';
  }

  compatibleProducts.past.forEach((item, index) => {
    if ((index + 1) % 5 === 0) pastArr[5] += `<li>${item.name}</li>`;
    else if ((index + 1) % 4 === 0) pastArr[4] += `<li>${item.name}</li>`;
    else if ((index + 1) % 3 === 0) pastArr[3] += `<li>${item.name}</li>`;
    else if ((index + 1) % 2 === 0) pastArr[2] += `<li>${item.name}</li>`;
    else if ((index + 1) % 1 === 0) pastArr[1] += `<li>${item.name}</li>`;
  });

  pastArr.forEach((item) => {
    if (item) {
      pastStr += '<ul style="flex:1; list-style-type: none; padding-left: 0px;">';
      pastStr += `${item}`;
      pastStr += '</ul>';
    }
  });

  if (compatibleProducts.past.length > 0) {
    pastWrap += '<div class="compatible-machines-past">';
    pastWrap += `<h4 class="small" style="padding-bottom: 10px;">${tr(translations, 'old_machines', 'Old Machines')}</h4>`;
    pastWrap += '<div class="row small" style="justify-content: space-between;">';
    pastWrap += `${pastStr}`;
    pastWrap += '</div>';
    pastWrap += '</div>';
  }

  return `<div class="compatible-machines-sec">
      <h4>${tr(translations, 'compatible_machines', 'COMPATIBLE MACHINES', textCasing.U)}</h4>
      <div class="line" style="margin-bottom: 0"></div>
    </div>
    ${currentWrap}
    ${pastWrap}`;
};

export default compatibleMachines;
