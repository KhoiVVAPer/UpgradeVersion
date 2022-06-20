import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { DcaImage } from '../../elements';
import { appStyles } from '../../../../config';
import { HtmlParser } from '..';
import styles from './styles';

const ImageTextCard = ({
  headline,
  text,
  url,
  dcaKey,
  headlineType
}) => {
  const headlineStyle = headlineType ? { ...appStyles[headlineType] } : {};
  return (
    <View style={styles.listItem}>
      <View style={styles.imageWrap}>
        {
          url ? (
            <DcaImage
              dcaTest="image"
              url={url}
              wrapStyle={styles.imageWrap}
              imageStyle={styles.image}
              resizeMode="contain"
              useApectRatio
              showEnlargedImage
            />
          ) : null
        }
      </View>
      <View style={styles.contentWrap}>
        {
          headline
            ? (
              <HtmlParser
                dcaTest="heading"
                html={headline}
                textKey={`${dcaKey}-headline`}
                style={[styles.headline, headlineStyle]}
              />
            ) : null
        }
        {
          text ? (
            <HtmlParser
              dcaTest="description"
              html={text}
              // html={'adas asdasd asdasd asdasdasd<a href="asdasdasd">Test link</a> asdasd asdasd adasdd adadad'}
              textKey={`${dcaKey}-text`}
              style={styles.description}
            />
          ) : null
        }
      </View>
    </View>
  );
};

ImageTextCard.propTypes = {
  headline: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  dcaKey: PropTypes.string.isRequired,
  headlineType: PropTypes.string
};
ImageTextCard.defaultProps = {
  headline: undefined,
  url: undefined,
  text: '',
  headlineType: undefined
};
export default ImageTextCard;
