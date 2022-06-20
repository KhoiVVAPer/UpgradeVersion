import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { helpers } from '../../../../config';
import styles from './styles';
import ListItem from './iconListItem';

class Pictograms extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderItem = ({ item }) => {
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 6, margin: 10 }} />;
    return (
      <ListItem iconData={item} />
    );
  }

  render() {
    const { productDetailsObj } = this.props;

    const arr = [...productDetailsObj.icons];
    let arrMod = 0;
    if (productDetailsObj.icons.length < 6) {
      arrMod = 6 - productDetailsObj.icons.length;
    } else if (productDetailsObj.icons.length > 6 && productDetailsObj.icons.length % 6 > 0) {
      arrMod = 6 - (productDetailsObj.icons.length % 6);
    }
    for (let i = 0; i < arrMod; i += 1) {
      arr.push({});
    }
    return (
      <View style={styles.iconWrap}>
        <FlatList
          extraData={this.state}
          data={arr}
          renderItem={this.renderItem}
          contentContainerStyle={styles.iconItemContainer}
          columnWrapperStyle={styles.iconItemColContainer}
          keyExtractor={(item, index) => `${index}_picto`}
          scrollEnabled={false}
          numColumns={6}
        />
      </View>
    );
  }
}

export default Pictograms;
