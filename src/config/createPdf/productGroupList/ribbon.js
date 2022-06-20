const ribbonData = (productListData) => {
  const str = `<div class="ribbon-text">
    <h1>${productListData.headline && productListData.headline.toLocaleUpperCase()}</h1>
    <p>${productListData.description}</p>
  </div>
  `;
  return str;
};

export default ribbonData;
