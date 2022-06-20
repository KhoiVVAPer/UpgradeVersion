/**
 * @fileoverview Navigations configurations are
 * defined in this file
 * @package
 */
import { appConstants } from '../config';

const { routes } = appConstants;

const commonAnimation = {
  animations: {
    push: {
      // waitForRender: true,
    },
    showModal: {
      // waitForRender: true
    }
  }
};

export const landingPageNav = ([
  {
    component: {
      name: routes.LANDING_PAGE,
      passProps: {

      },
      options: {
        topBar: {
          drawBehind: true,
          visible: false
        },
        ...commonAnimation
      }
    },
  },
]);

export const rootPageNav = ([
  {
    component: {
      id: 0,
      name: routes.PAGE_CONTENT,
      passProps: {
        pageId: 0,
        isConfiguring: true
      },
      options: {
        topBar: {
          drawBehind: true,
          visible: false
        },
        ...commonAnimation
      }
    },
  },
]);

export const pageContent = (props) => {
  const idObj = props.pageId ? { id: props.pageId } : {};
  return {
    component: {
      // id: String(props.id),
      ...idObj,
      name: routes.PAGE_CONTENT,
      options: {
        topBar: {
          drawBehind: true,
          visible: false
        },
        ...commonAnimation
      },
      passProps: props.passProps
    },
  };
};

export const settings = ({
  component: {
    name: routes.SETTINGS,
    options: {
      topBar: {
        drawBehind: true,
        visible: false
      },
      ...commonAnimation
    }
  },
});

export const productFinder = (props) => ({
  component: {
    name: routes.PRODUCTFINDER,
    options: {
      topBar: {
        drawBehind: true,
        visible: false
      },
      ...commonAnimation
    },
    passProps: props.passProps
  },
});

export const favourite = ({
  component: {
    name: routes.FAVOURITE,
    options: {
      topBar: {
        drawBehind: true,
        visible: false
      },
      ...commonAnimation
    }
  },
});

export const productCompare = ({
  component: {
    name: routes.PRODUCT_COMPARE,
    options: {
      topBar: {
        drawBehind: true,
        visible: false
      },
      ...commonAnimation
    }
  },
});

export const searchPage = (props) => ({
  component: {
    name: routes.SEARCH_PAGE,
    options: {
      topBar: {
        drawBehind: true,
        visible: false
      },
      ...commonAnimation
    },
    passProps: props.passProps
  },
});

export const getRoute = {
  [routes.LANDING_PAGE]: landingPageNav,
  [routes.PAGE_CONTENT]: pageContent,
  [routes.SETTINGS]: settings,
  [routes.FAVOURITE]: favourite,
  [routes.PRODUCT_COMPARE]: productCompare,
  [routes.PRODUCTFINDER]: productFinder,
};
