import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';

import LeftSection from './leftSection';
import RightSection from './rightSection';

class TechData extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      layoutData,
      productDetailsObj,
      productDetailsData
    } = this.props;
    return (
      <View style={styles.wrap}>
        <LeftSection
          layoutData={layoutData}
          productDetailsObj={productDetailsObj}
          productDetailsData={productDetailsData}
        />
        <RightSection
          layoutData={layoutData}
          productDetailsObj={productDetailsObj}
        />
      </View>
    );
  }
}

export default TechData;
