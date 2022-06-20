/**
 * Mock the rn-fetch-blob npm module
 * @return {!Object<TYPE>}
 */
jest.mock('rn-fetch-blob', () => ({
  DocumentDir: () => { },
  fs: {
    dirs: {
      DocumentDir: ''
    }
  }
}));

/**
 * Mock the @react-native-community/netinfo npm module
 * @return {!Object<TYPE>}
 */
jest.mock('@react-native-community/netinfo', () => ({}));

/**
 * Mock the react-native-background-downloader npm module
 * @return {!Object<TYPE>}
 */
jest.mock('react-native-background-downloader', () => ({
  download: () => {}
}));

/**
 * Mock the react-native-share npm module
 * @return {!Object<TYPE>}
 */
jest.mock('react-native-share', () => ({
  open: () => {}
}));

/**
 * Mock the @react-native-firebase npm module
 * @return {!Object<TYPE>}
 */
jest.mock('@react-native-firebase/analytics', () => ({
  analytics: () => { }
}));

/**
 * Mock the @react-native-reanimated npm module
 * @return {!Object<TYPE>}
 */
jest.mock("react-native-reanimated", () => ({}));

/**
 * Mock the @react-native-gesture-handler npm module
 * @return {!Object<TYPE>}
 */
jest.mock("react-native-gesture-handler", () => ({
  gestureHandlerRootHOC: () => { }
}));

/**
 * Mock the @react-native-tab-view npm module
 * @return {!Object<TYPE>}
 */
jest.mock("react-native-tab-view", () => ({}));

/**
 * Mock the @react-native-file-viewer npm module
 * @return {!Object<TYPE>}
 */
jest.mock("react-native-file-viewer", () => ({}));

/**
 * Mock all native dependancies
 * @return {!Object<TYPE>}
 */
jest.mock('react-native', () => require('react-native-mock-render'), { virtual: true })

/**
 * Mock the @realm
 * @return {!Object<TYPE>}
 */
jest.mock("realm", () => jest.fn().mockImplementation(() => { return {
  path: ''
} }));

/**
 * Mock the @realm
 * @return {!Object<TYPE>}
 */
jest.mock("react-native-permissions", () => ({
  NativeModule: { RNPermissions: {} }
}));

/**
 * Mock the @realm
 * @return {!Object<TYPE>}
 */
jest.mock("rn-range-slider", () => ({}));

/**
 * Mock the @react-native-navigation
 * @return {!Object<TYPE>}
 */
jest.mock("react-native-navigation", () => ({
  Navigation: {
    events: () => ({
      bindComponent: () => {}
    })
  }
}));

jest.mock("react-native-render-html-table-bridge", ()=>({
  IGNORED_TAGS: [],
  alterNode: "",
  makeTableRenderer: ()=>{}
}))