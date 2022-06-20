import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { FontIcon } from '../../../generic';
import { icons, colors, tr } from '../../../../../config';
import styles from './styles';

class ContentDropdown extends Component {
  constructor(props) {
    super(props);
    const { translations } = this.props;
    this.state = {
      seletedItem: { id: null, name: `${tr(translations, 'please_select', 'Please select')}...` }
    };
  }

  selectItem = (index, data) => {
    const { setupDropdown, dropdownIndex } = this.props;
    this.setState({
      seletedItem: data[index]
    }, () => {
      setupDropdown(dropdownIndex, data[index]);
    });
  }

  renderDropdown = (label) => (
    <View style={styles.dropdown}>
      <Text style={styles.dropdownlbl}>{label}</Text>
      <FontIcon
        type={icons.arrow_down[1]}
        icon={icons.arrow_down[0]}
        color={colors.icons}
        size={10}
      />
    </View>
  );

  render() {
    const { seletedItem } = this.state;
    const { dataArr } = this.props;

    return (
      <Dropdown
        data={dataArr}
        renderBase={() => this.renderDropdown(seletedItem.name)}
        inputContainerStyle={{ borderBottomColor: 'transparent' }}
        valueExtractor={({ name }) => name}
        onChangeText={(value, index, data) => this.selectItem(index, data)}
        pickerStyle={{}}
        itemCount={6}
      />
    );
  }
}

ContentDropdown.propTypes = {
  dataArr: PropTypes.arrayOf(PropTypes.any).isRequired,
  setupDropdown: PropTypes.func.isRequired,
  translations: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default ContentDropdown;
