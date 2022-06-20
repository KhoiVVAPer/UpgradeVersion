import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { FontIcon, HtmlParser } from '../../generic';
import { TouchableDebounce } from '../../elements';
import { colors, icons } from '../../../../config';
import styles from './styles';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  render() {
    const { collapsed } = this.state;
    const { listItem, textKey } = this.props;

    const iconType = collapsed ? 'arrow_right_sign' : 'arrow_down_sign';

    return (
      <View style={styles.listItemWrap}>
        <TouchableDebounce
          style={styles.listItemHead}
          onPress={() => { this.setState({ collapsed: !collapsed }); }}
        >
          <FontIcon
            type={icons[iconType][1]}
            icon={icons[iconType][0]}
            color={colors.black}
            size={14}
          />
          <HtmlParser
            html={listItem.name}
            textKey={`${textKey}-name`}
            style={styles.listItemHeadTxt}
          />
        </TouchableDebounce>
        <View style={[styles.listItemDesc, { display: collapsed ? 'none' : 'flex' }]}>
          <HtmlParser
            html={listItem.description}
            textKey={`${textKey}-description`}
            style={styles.listItemDescTxt}
          />
        </View>
      </View>
    );
  }
}

ListItem.propTypes = {
  listItem: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ListItem;
