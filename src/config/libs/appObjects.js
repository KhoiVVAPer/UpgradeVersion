import * as globals from './globals';

const appObjects = {
  universalData: {
    useMobiledata: false,
    viewedOnboardingStep: 0,
    onboardingSkiped: false,
    onboardingIds: '',
    analyticsTracking: true,
    dbVersion: globals.DB_VERSION
  }
};

export default appObjects;
