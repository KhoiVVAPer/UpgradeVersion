/**
 * @fileoverview This is genric error component for app.
 * All error messages text and diplay view is shown from this component
 * @package
 */
import React from 'react';
import {
  ScrollView,
  Text,
  RefreshControl,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import FontIcon from '../fontIcon/_fontIcon';
import Button from '../button';
import {
  appConstants,
  icons,
  colors,
  tr,
  globals
} from '../../../../config';
import { rootNavigation } from '../../../../navigation';
import styles from './styles';

const { routes, textCasing } = appConstants;

const ErrorView = ({
  title,
  error,
  reloadPage,
  settings,
  componentId,
  showTitle,
  isScanner,
  isNetConnected
}) => {
  const translations = globals.GET_APP_DATA('translationsArr');
  return (
    <ScrollView
      style={styles.wrap}
      contentContainerStyle={styles.wrapInner}
      refreshControl={(
        <RefreshControl
          refreshing={false}
          onRefresh={() => { reloadPage(); }}
        />
      )}
    >
      <FontIcon
        type={icons.exclamation_circle[1]}
        icon={icons.exclamation_circle[0]}
        color={colors.black}
        size={40}
        wrapStyle={styles.errorIco}
      />
      <Text
        dcaTest="title"
        style={[
          styles.title,
          { display: showTitle && !isScanner ? 'flex' : 'none' }
        ]}
      >
        {title}
      </Text>
      <Text
        dcaTest="error"
        style={styles.errorTxt}
      >
        {isScanner
          ? tr(translations, 'not_found', 'Not Found')
          : error}
      </Text>
      {
        settings && !isScanner
          ? (
            <View style={styles.settingsWrap}>
              <Button
                onPress={() => {
                  if (isNetConnected) {
                    Navigation.pop(componentId);
                  } else {
                    Navigation.push(componentId, rootNavigation.getRoute[routes.SETTINGS]);
                  }
                }}
                text={isNetConnected
                  ? tr(translations, 'return_to_previous_page', 'Return to Previous page', textCasing.U)
                  : tr(translations, 'goto_settings', 'Goto settings', textCasing.U)}
                theme="app"
              />
            </View>

          )
          : null
      }
    </ScrollView>
  );
};

ErrorView.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  reloadPage: PropTypes.func,
  settings: PropTypes.bool,
  componentId: PropTypes.string,
  showTitle: PropTypes.bool,
  isScanner: PropTypes.bool,
  isNetConnected: PropTypes.bool
};

ErrorView.defaultProps = {
  title: 'ERROR 404',
  error: 'Sorry, this content is at the moment not availble because you are offline.\nPlease try again later',
  reloadPage: () => { },
  settings: false,
  componentId: '0',
  showTitle: true,
  isScanner: false,
  isNetConnected: true
};

export default ErrorView;
