import React from 'react';
import {
  Modal,
  View,
  Text
} from 'react-native';
import Config from 'react-native-config';
import PropTypes from 'prop-types';
import {
  appConstants,
  colors,
  icons,
  tr
} from '../../../../config';
import { FontIcon } from '../../../custom';
import styles from '../styles';

const { downloadingFlags, catelogueTypes } = appConstants;

const DownloadProgressModal = ({
  showDownloadProgressModal,
  toggleDownloadProgressModal,
  translations,
  offlineDownload,
  mediaUrlArr
}) => {
  const hgDbArr = offlineDownload.home_and_garden_db.split('|');
  const proDbArr = offlineDownload.proffesional_db.split('|');

  const isCommonDb = (proDbArr.includes(Config.COMMON_DATABASE) || hgDbArr.includes(Config.COMMON_DATABASE));
  const isHgDb = hgDbArr.includes(Config.HOME_AND_GARDEN_DATABASE);
  const isProfDb = proDbArr.includes(Config.PROFESSIONAL_DATABASE);
  const isHgMedia = offlineDownload.home_and_garden_media_flag === downloadingFlags.DOWNLOADED;
  const isProfMedia = offlineDownload.proffesional_media_flag === downloadingFlags.DOWNLOADED;

  const hgMediaCount = mediaUrlArr[catelogueTypes.HOME_AND_GARDEN].length;
  const proMediaCount = mediaUrlArr[catelogueTypes.PROFFESSIONAL].length;
  return (
    <Modal
      animationType="fade"
      transparent
      visible={showDownloadProgressModal}
      onRequestClose={() => { }}
    >
      <View style={styles.downloadProgressWrap}>
        <View style={styles.downloadProgressInner}>
          <View style={styles.closeWrap}>
            <Text style={styles.downloadProgressHead}>{tr(translations, 'download_status', 'Download Status')}</Text>
            <FontIcon
              type={icons.closeIon[1]}
              icon={icons.closeIon[0]}
              color={colors.text}
              size={25}
              innerWrapStyle={{ padding: 8 }}
              onPress={() => { toggleDownloadProgressModal(false); }}
            />
          </View>
          <View style={styles.downloadProgressItem}>
            <FontIcon
              type={isHgDb ? icons.checkcircle[1] : icons.world_outline[1]}
              icon={isHgDb ? icons.checkcircle[0] : icons.world_outline[0]}
              color={isHgDb ? colors.green : colors.textLight}
              size={22}
            />
            <Text
              style={[
                styles.downloadItemTxt,
                { color: isHgDb ? colors.text : colors.textLight }
              ]}
            >
              {tr(translations, 'home_and_garden_database', 'Home & Garden Database')}
            </Text>
          </View>
          <View style={styles.downloadProgressItem}>
            <FontIcon
              type={isProfDb ? icons.checkcircle[1] : icons.world_outline[1]}
              icon={isProfDb ? icons.checkcircle[0] : icons.world_outline[0]}
              color={isProfDb ? colors.green : colors.textLight}
              size={22}
            />
            <Text
              style={[
                styles.downloadItemTxt,
                { color: isProfDb ? colors.text : colors.textLight }
              ]}
            >
              {tr(translations, 'professional_database', 'Professional Database')}
            </Text>
          </View>
          <View style={styles.downloadProgressItem}>
            <FontIcon
              type={isCommonDb ? icons.checkcircle[1] : icons.world_outline[1]}
              icon={isCommonDb ? icons.checkcircle[0] : icons.world_outline[0]}
              color={isCommonDb ? colors.green : colors.textLight}
              size={22}
            />
            <Text
              style={[
                styles.downloadItemTxt,
                { color: isCommonDb ? colors.text : colors.textLight }
              ]}
            >
              {tr(translations, 'common_database', 'Common Database')}
            </Text>
          </View>
          <View style={styles.downloadProgressItem}>
            <FontIcon
              type={isHgMedia ? icons.checkcircle[1] : icons.world_outline[1]}
              icon={isHgMedia ? icons.checkcircle[0] : icons.world_outline[0]}
              color={isHgMedia ? colors.green : colors.textLight}
              size={22}
            />
            <Text
              style={[
                styles.downloadItemTxt,
                { color: isHgMedia ? colors.text : colors.textLight }
              ]}
            >
              {`${tr(translations, 'home_and_garden_images', 'Home & Garden images')} (Downloaded-${hgMediaCount})`}
            </Text>
          </View>
          <View style={styles.downloadProgressItem}>
            <FontIcon
              type={isProfMedia ? icons.checkcircle[1] : icons.world_outline[1]}
              icon={isProfMedia ? icons.checkcircle[0] : icons.world_outline[0]}
              color={isProfMedia ? colors.green : colors.textLight}
              size={22}
            />
            <Text
              style={[
                styles.downloadItemTxt,
                { color: isProfMedia ? colors.text : colors.textLight }
              ]}
            >
              {`${tr(translations, 'professional_images', 'Professional images')} (Downloaded-${proMediaCount})`}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

DownloadProgressModal.propTypes = {
  showDownloadProgressModal: PropTypes.bool.isRequired,
  toggleDownloadProgressModal: PropTypes.func.isRequired,
  translations: PropTypes.arrayOf(PropTypes.any).isRequired,
  offlineDownload: PropTypes.objectOf(PropTypes.any).isRequired,
  mediaUrlArr: PropTypes.objectOf(PropTypes.any).isRequired
};
export default DownloadProgressModal;
