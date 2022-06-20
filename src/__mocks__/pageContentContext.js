const pageContentContextMock = {
  getProductList: () => { },
  getProductDetails: () => { },
  getProductListData: () => { },
  componentId: 0,
  getReduxData: () => { },
  toggleScroll: () => { },
  productActiveAnchor: () => { },
  getFavouriteModalRef: () => { },
  favourite: () => { },
  productCompare: () => { },
  toggleProductCompare: () => { },
  toggleLoader: () => { },
  getCompareModalRef: () => { },
};

export const PageContentContext = ({
  Consumer(props) {
    return props.children(pageContentContextMock)
  }
})
