/**
 * @fileoverview Accessories and cleaning agents section for Manual content pdf
 * @package
 */
import tr from '../../libs/translator';
import appContansts from '../../libs/constants';

const { textCasing } = appContansts;

const cleaningAgents = (productData, translations) => {
  if (
    (!productData || !productData.accessories.length)
    && (!productData.detergents || !productData.detergents.length)
  ) return '';

  return `
    <div class="cleaning_agents_and_accessories_sec">
      <h4>${tr(translations, 'cleaning_agents_and_accessories', 'Cleaning agents and accessories', textCasing.U)}</h4>
      <div class="line"></div>
      <p class="bold" style="font-size: 11px;">${tr(translations, 'please_contact_for_accessories_and_detergents', 'Please contact your dealer for more information on suitable accessories and detergents.')}</p>
    </div>
  `;
};

export default cleaningAgents;
