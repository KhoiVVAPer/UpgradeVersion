/**
 * @fileoverview This component renders design template
 * for anchor manual content.
 * @package
 */
import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableDebounce } from '../../elements';
import { appContexts } from '../../../../config';
import styles from './styles';

const { PageContentContext } = appContexts;

class Anchors extends Component {
  constructor(props) {
    super(props);
    const { layoutData } = this.props;
    this.state = {
      activeAnchor: layoutData.values[0]
    };
  }

  componentDidMount() {
    this.setAnchorRef();
  }

  setAnchorRef = () => {
    const { setAnchorRef } = this.context;
    if (setAnchorRef) setAnchorRef(this);
  }

  setAnchor = (targetId) => {
    const { layoutData } = this.props;

    const anchors = layoutData.values;

    const activeAnchor = anchors.find((item) => (item.targetId === targetId));
    if (activeAnchor) {
      this.setState({ activeAnchor });
    }
  }

  navigate = (anchor) => {
    const { navigateTo } = this.props;
    this.setState({
      activeAnchor: anchor
    });
    navigateTo(anchor.targetId);
  }

  renderAnchor = (item, index) => {
    const { activeAnchor } = this.state;

    const anchorWrapActive = activeAnchor.title === item.title ? styles.anchorWrapActive : {};
    const anchorActive = activeAnchor.title === item.title ? styles.anchorActive : {};
    return (
      <TouchableDebounce
        key={`anchor_${index}`}
        onPress={() => this.navigate(item)}
        style={[styles.anchorWrap, anchorWrapActive]}
        delayDuration={0}
      >
        <Text style={[styles.anchor, anchorActive]}>{item.title.toUpperCase()}</Text>
      </TouchableDebounce>
    );
  }

  render() {
    const { layoutData } = this.props;

    const anchors = layoutData.values;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerInner}
        horizontal
      >
        {
          anchors.map((item, index) => this.renderAnchor(item, index))
        }
      </ScrollView>
    );
  }
}

Anchors.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired,
  navigateTo: PropTypes.func.isRequired
};

Anchors.contextType = PageContentContext;
export default Anchors;
