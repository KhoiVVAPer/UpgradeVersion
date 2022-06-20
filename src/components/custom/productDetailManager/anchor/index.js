/**
 * @fileoverview This component renders design template
 * for anchor manual content.
 * @package
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { appContexts, appConstants, tr, helpers } from '../../../../config';
import TouchableDebounce from '../../elements/touchableDebounce';
import styles from './styles';

const { textCasing, productDetailsDataSequence } = appConstants;
const { PageContentContext } = appContexts;

class Anchors extends Component {
  constructor(props) {
    super(props);
    const { layoutData } = this.props;
    this.state = {
      activeAnchor: layoutData && layoutData[0] ? layoutData[0] : []
    };
  }

  componentDidMount() {
    const { setAnchorData } = this.props;
    setAnchorData(this);
  }

  navigate = (anchor) => {
    const { navigateTo } = this.props;
    helpers.analyticsAction({ actionType: 'product_details', actionObj: { 'a.action': anchor.name } });
    this.setState({
      activeAnchor: anchor
    });
    navigateTo(anchor.type);
  }

  setActiveAnchor = (anchor) => {
    this.setState({
      activeAnchor: anchor
    });
  }

  renderAnchor = (item, index) => {
    const { activeAnchor } = this.state;
    const { translations } = this.context;
    let { name, key } = item;
    if (item.type === productDetailsDataSequence.RECOMMENDATIONS && item.hasSingle) {
      name = item.single.name;
      key = item.single.key;
    }
    const anchorWrapActive = activeAnchor.name === name ? styles.anchorWrapActive : {};
    const anchorActive = activeAnchor.name === name ? styles.anchorActive : {};
    return (
      <TouchableDebounce
        key={`anchor_${index}`}
        onPress={() => this.navigate(item)}
        style={[styles.anchorWrap, anchorWrapActive]}
        delayDuration={0}
      >
        <Text style={[styles.anchor, anchorActive]}>{tr(translations, key, name, textCasing.U)}</Text>
      </TouchableDebounce>
    );
  }

  render() {
    const { layoutData } = this.props;

    if (!layoutData) return (<View />);

    return (
      <View style={styles.containerInner}>
        {layoutData.map((item, index) => this.renderAnchor(item, index))}
      </View>
    );
  }
}

Anchors.propTypes = {
  layoutData: PropTypes.arrayOf(PropTypes.any).isRequired,
  setAnchorData: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
};

Anchors.contextType = PageContentContext;
export default Anchors;
