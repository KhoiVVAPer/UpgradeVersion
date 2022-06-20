import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

const translationSchema = {
  name: schemas.UNIVERSAL,
  primaryKey: 'id',
  properties: {
    id: 'int',
    useMobiledata: { type: 'bool', optional: true },
    viewedOnboardingStep: { type: 'int', optional: true },
    onboardingSkiped: { type: 'bool', optional: true },
    onboardingIds: { type: 'string', optional: true },
    analyticsTracking: { type: 'bool', optional: true },
    dbVersion: { type: 'int', optional: true },
  }
};

export default translationSchema;
