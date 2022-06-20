import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Popover from 'react-native-popover-view';
import DcaImage from '../../elements/dcaImage';
import TouchableDebounce from '../../elements/touchableDebounce';
import styles from './styles';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTipVisible: false
    };
    this.moreTooltipRef = null;
  }

  render() {
    const { iconData } = this.props;
    const { toolTipVisible } = this.state;
    return (
      <View style={styles.listItem}>
        <TouchableDebounce
          onPress={() => { if (iconData.text !== '') { this.setState({ toolTipVisible: true }); } }}
          ref={(ref) => { this.moreTooltipRef = ref; }}
        >
          <DcaImage
            url={iconData.url}
            imageStyle={styles.image}
            resizeMode="cover"
            useApectRatio
          />
        </TouchableDebounce>
        <Popover
          isVisible={toolTipVisible}
          arrowStyle={styles.popoverArrow}
          fromView={this.moreTooltipRef}
          onRequestClose={() => this.setState({ toolTipVisible: false })}
        >
          <View style={styles.propover}>
            <Text
              style={styles.propoverTxt}
            >
              {iconData.text}
            </Text>
          </View>
        </Popover>
      </View>
    );
  }
}

export default ListItem;
