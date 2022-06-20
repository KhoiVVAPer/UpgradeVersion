import React, { Component } from 'react';
import {
  View, Image, Alert
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import { DcaImage, TouchableDebounce } from '../../elements';
import { HtmlParser } from '../../generic';
import {
  globals, texts, images, appContexts, tr
} from '../../../../config';
import styles from './styles';

const { PageContentContext } = appContexts;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDownloading: false
    };
  }

  saveDocument = (docUrl) => {
    const { translations } = this.context;
    this.setState({
      isDownloading: true
    }, () => {
      const arr = docUrl.split('/');
      const fileName = arr[arr.length - 1];
      RNFetchBlob.config({
        path: `${globals.DOCUMENT_SAVE_LOCATION}/${fileName}`
      }).fetch('GET', docUrl, {
      }).then(() => {
        FileViewer.open(`${globals.DOCUMENT_SAVE_LOCATION}/${fileName}`)
          .then(() => {
            this.setState({ isDownloading: false });
          })
          .catch(() => {
            this.setState({ isDownloading: false });
            Alert.alert(
              tr(translations, 'error', texts.alerts.error),
              tr(translations, 'file_could_not_be_open', 'Sorry, File could not be open/downloaded')
            );
          });
      });
    });
  }

  renderImage = () => {
    const { isDownloading } = this.state;
    const { documentData } = this.props;
    let imageUrl = '';
    documentData.urls.map((item) => {
      if (item.type === 'preview') {
        imageUrl = item.url;
      }
      return null;
    });
    if (isDownloading) return null;
    return (
      <DcaImage
        url={imageUrl}
        imageStyle={styles.image}
        resizeMode="contain"
      />
    );
  }

  remderloading = () => {
    const { isDownloading } = this.state;
    if (!isDownloading) return null;
    return (
      <View style={styles.loaderImgWrap}>
        <Image
          source={images.loader}
          style={styles.loaderImg}
          resizeMode="contain"
        />
      </View>
    );
  }

  render() {
    const { translations } = this.context;
    const { documentData, textKey } = this.props;
    // const title = documentData.type.charAt(0).toUpperCase() + documentData.type.slice(1);
    const translatedTitle = translations[0][documentData.type] ? translations[0][documentData.type].toLowerCase() : 'document';
    const title = translatedTitle.charAt(0).toUpperCase() + translatedTitle.slice(1);

    let documentUrl = '';
    documentData.urls.map((item) => {
      if (item.type === 'file') {
        documentUrl = item.url;
      }
      return null;
    });
    return (
      <TouchableDebounce
        style={styles.listItem}
        onPress={() => this.saveDocument(documentUrl)}
      >
        <View style={styles.imgWrap}>
          {this.remderloading()}
          {this.renderImage()}
        </View>
        <HtmlParser
          html={title}
          textKey={textKey}
          style={styles.title}
          onPress={() => this.saveDocument(documentUrl)}
        />
      </TouchableDebounce>
    );
  }
}

ListItem.contextType = PageContentContext;
export default ListItem;
