import React, { Component } from 'react';
import {
  View,
  Modal,
  Text,
  Image
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { TouchableDebounce } from '../../elements';
import { images } from '../../../../config';
import styles from './styles';

class ScannerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onScan = (e) => {
    const { scannerResponse } = this.props;
    scannerResponse(e);
  }

  render() {
    const { scannerToggle } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible
        onRequestClose={() => { scannerToggle(); }}
      >
        <View style={styles.scannerHeader}>
          <Image
            source={images.logo}
            style={styles.logoWrap}
            resizeMode="contain"
          />
        </View>
        <QRCodeScanner
          onRead={this.onScan}
          cameraStyle={{ height: '100%', width: '100%' }}
        // flashMode={QRCodeScanner.Constants.FlashMode.torch}
        />
        <TouchableDebounce
          onPress={() => { scannerToggle(); }}
          style={styles.scannerFooter}
        >
          <Text style={styles.scannerFooterTxt}>Cancel</Text>
        </TouchableDebounce>
      </Modal>
    );
  }
}

export default ScannerModal;
