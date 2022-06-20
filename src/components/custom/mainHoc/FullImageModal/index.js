import React from 'react';
import {
  View,
  Modal,
  Image
} from 'react-native';
import {
  icons,
  colors,
} from '../../../../config';
import appStyle from '../../../../assets/styles/appStyles';
import FontIcon from '../../generic/fontIcon/_fontIcon';
import styles from './styles';

const FullImageModal = ({ isVisible, toggleVisiblity, imageUri }) => (
  <Modal
    animationType="fade"
    transparent
    visible={isVisible}
    onRequestClose={() => { toggleVisiblity(false); }}
  >
    <View style={appStyle.container}>
      <View style={styles.modalWrap}>
        <View style={styles.closeWrap}>
          <FontIcon
            type={icons.closeIon[1]}
            icon={icons.closeIon[0]}
            color={colors.text}
            size={20}
            innerWrapStyle={{ padding: 8 }}
            onPress={() => toggleVisiblity(false)}
          />
        </View>
        {
            imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            )
          }
      </View>
    </View>
  </Modal>
);

export default FullImageModal;
