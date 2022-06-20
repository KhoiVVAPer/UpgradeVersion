/**
 * @fileoverview Features And Benefits Warnings section for Manual content pdf
 * @package
 */
import * as helpers from '../../libs/helpers';
import tr from '../../libs/translator';
import appContansts from '../../libs/constants';
import { getImageFromCache } from '../pdfHelpers';

const { textCasing } = appContansts;

const featuresAndBenefits = (productData, translations) => new Promise(async (resolve) => {
  if (!productData.featureBenefits || !productData.featureBenefits.length) {
    resolve();
    return;
  }

  const imagesSecArr = productData.featureBenefits.slice(0, 3);
  let listSecArr = productData.featureBenefits.length >= 3 ? productData.featureBenefits.slice(3, productData.featureBenefits.length) : [];
  if (listSecArr.length) {
    listSecArr = helpers.chunkArray(listSecArr, 2);
  }

  let imagesSecStr = '';
  let listSecStr = '';
  const extractedImg = imagesSecArr.map((item) => {
    let imgUrl = '';
    item.images && item.images.forEach((item1) => {
      if (item1.type === 'full') imgUrl = item1.url;
    });
    return { url: imgUrl };
  });

  const imageUrlArr = await getImageFromCache(extractedImg, 'url');

  imagesSecArr.forEach((item, index) => {
    let desc = '';
    item.benefits.map((benefit, benefitIndex) => {
      const prefix = benefitIndex !== 0 ? ' ' : '';
      desc += prefix + benefit;
      return null;
    });

    imagesSecStr += `<div style="display: flex; flex-direction: column; padding-left: 10px; padding-right: 10px; flex: 1;">
        <img style="object-fit: cover; width: 100%; height: 235px;" src="${imageUrlArr[index]}">
        <div class="small" style="padding-left: 5px; padding-right: 5px; overflow-wrap: break-word;">
          <p class="bold"> ${item.feature}</p>
          <p class="small"> ${desc}</p>
        </div>
      </div>`;
  });

  listSecArr.forEach((listArr) => {
    listSecStr += '<div class="row feature-benifit-sec-2">';
    listArr.forEach((listItem) => {
      listSecStr += '<div class="card">';
      listSecStr += `<p class="bold small">${listItem.feature}</p>`;
      listSecStr += '<ul style="font-size: 10px; padding-left: 10px; list-style-type: square;">';
      listItem.benefits.forEach((item) => {
        listSecStr += `<li>${item}</li>`;
      });
      listSecStr += '</ul>';
      listSecStr += '</div>';
    });
    listSecStr += '</div>';
  });

  const str = `<div id="Features_and_Benefits" class="feature-benifit-sec-1">
    <h4>${tr(translations, 'feature_and_benefits', 'Feature and Benefits', textCasing.U)}</h4>
    <div class="line"></div>
    <div class="row" style="justify-content: space-between;padding: 0px;">
      ${imagesSecStr}
    </div>
  </div>
  ${listSecStr}`;

  resolve(str);
});

export default featuresAndBenefits;
