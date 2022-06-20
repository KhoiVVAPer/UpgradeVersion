import { Alert } from 'react-native';
import * as globals from './globals';
import tr from './translator';
import texts from '../utils/texts';
import * as colors from '../utils/colors';

/**
 * Set default marking text for onboarding
 * @param {string} saveMarkingText is text to be marked
 * @param {int} pageId is of page
 */
const setDefaultMarking = (saveMarkingText, pageId) => {
  const translations = globals.GET_APP_DATA('translationsArr');
  if ((this.selectedTextEnd - this.selectedTextStart) < 1) {
    Alert.alert(
      tr(translations, 'error', texts.alerts.error),
      tr(translations, 'no_text_is_marked', 'No text is marked')
    );
    return;
  }

  const markText = tr(translations, 'order_number', 'Order number');

  const data = {
    key: `prodD-techdata-partnumberFormatted-${pageId}-Text-0-0-DCAText-0-null`,
    text: markText,
    startOffset: 0,
    endOffset: markText.length,
    comment: '',
    highlightColor: colors.red,
    commentDate: new Date().getTime()
  };
  saveMarkingText(data);
};

export default setDefaultMarking;
