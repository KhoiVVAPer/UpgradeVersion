const mainHocContextMock = {
  componentId: 0,
  goBack: () => { },
  goBackTo: () => { },
  pageId: 0,
  screen: 'Test',
};

export const MainHocContext = ({
  Consumer(props) {
    return props.children(mainHocContextMock)
  }
})