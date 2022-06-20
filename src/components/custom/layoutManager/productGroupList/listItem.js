/**
 * @fileoverview This component renders design template
 * for image product group list item manual content.
 * @package
 */
import React, { Component } from 'react';
import {
  View, FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { DcaImage, TouchableDebounce } from '../../elements';
import { HtmlParser } from '../../generic';
import { appContexts } from '../../../../config';
import SubProductGroupItem from './subProductGroupItem';
import styles from './styles';
import { rootNavigation } from '../../../../navigation';

const { PageContentContext } = appContexts;

class ListItem extends Component {
  constructor(props) {
    super(props);
    const { productGroupData } = this.props;
    this.state = {
      productGroupData
    };
  }

  componentDidMount() {
  }

  renderSubProductGroupItem = ({ item, index }) => {
    const { navigate, textKey } = this.props;
    return (
      <SubProductGroupItem
        navigate={navigate}
        subProductGroup={item}
        textKey={`${textKey}-${index}-${item.id}`}
      />
    );
  }

  renderSubProductGroup = () => {
    const { productGroupData } = this.state;
    const { subProductGroupList } = this.context;

    const layoutId = productGroupData.id;

    if (!subProductGroupList[layoutId]
      || subProductGroupList[layoutId].loading
      || subProductGroupList[layoutId].error) {
      return null;
    }

    return (
      <View>
        <FlatList
          extraData={this.state}
          data={subProductGroupList[layoutId].obj.data}
          renderItem={this.renderSubProductGroupItem}
          listKey={(item) => `subProductGroup1_${item.id}`}
          keyExtractor={(item) => `subProductGroup2_${item.id}`}
          scrollEnabled={false}
        />
      </View>
    );
  }

  productFinderNavigation = (productFinderGroupData) => {
    const { componentId } = this.context;
    Navigation.push(
      componentId,
      rootNavigation.productFinder({
        passProps: {
          productFinderGroupData
        }
      })
    );
  }

  render() {
    const { productGroupData } = this.state;
    const {
      navigate, textKey, productFinderContent, productFinderGroupData, status
    } = this.props;

    // const ProductFinderGroupData=productFinderContent && productFinderContent.questions && productFinderContent.questions[0]
    let description = '';
    productGroupData.texts.map((item) => {
      if (item.type === 'class') {
        description = item.text;
      }
      return null;
    });

    let fullImage = '';
    productGroupData.texts.map((item1) => {
      if (item1.type === 'class') {
        item1.images.map((item2) => {
          if (item2.type === 'full') {
            fullImage = item2.url;
          }
          return null;
        });
      }
      return null;
    });


    return (
      <View style={styles.listItem}>
        <TouchableDebounce onPress={() => (productGroupData.id === '20035427'
          ? this.productFinderNavigation(productFinderGroupData)
          : navigate(productGroupData.id))}
        >
          <DcaImage
            url={fullImage}
            imageStyle={styles.listItemImg}
            wrapStyle={styles.listItemImgWrap}
            resizeMode={status === 'productFinder' ? 'contain' : 'cover'}
          />
          <View style={styles.listItemContent}>
            <HtmlParser
              html={productGroupData.name}
              textKey={`${textKey}-${productGroupData.id}-name`}
              style={styles.listItemImgHeadTxt}
              onPress={() => navigate(productGroupData.id)}
            />
            <HtmlParser
              html={description}
              textKey={`${textKey}-${productGroupData.id}-description`}
              style={styles.listItemImgDescTxt}
              onPress={() => navigate(productGroupData.id)}
            />
          </View>
        </TouchableDebounce>
        {this.renderSubProductGroup()}
      </View>
    );
  }
}

ListItem.propTypes = {
  productGroupData: PropTypes.objectOf(PropTypes.any).isRequired,
  navigate: PropTypes.func.isRequired,
  textKey: PropTypes.string.isRequired
};
ListItem.contextType = PageContentContext;
export default ListItem;
