/**
 * @fileoverview Configurable Components section for Manual content pdf
 * @package
 */
import tr from '../../libs/translator';
import appContansts from '../../libs/constants';

const { textCasing } = appContansts;

const configurableComponents = (configurableComponentArr, translations) => {
  if (!configurableComponentArr || !configurableComponentArr.length) return '';

  let str = '';
  configurableComponentArr.forEach((item) => {
    str += `<tr>
        <td width="70px" class="bold" style="padding-right: 0px;">${item.name}:</td>
        <td style="padding-left: 0px;">${item.description}</td>
      </tr>`;
  });

  return `<div class="configurable-component-sec">
      <h4>${tr(translations, 'configurable_component', 'CONFIGURABLE COMPONENTS', textCasing.U)}</h4>
      <div class="line"></div>
      <table class="table" style="width: 100%; font-size: 10px;">
        <tbody>
          ${str}
        </tbody>
      </table>
    </div>
  `;
};

export default configurableComponents;
