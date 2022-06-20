import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { DcaImage } from '../../elements';
import {
  helpers, appContexts, tr, appConstants
} from '../../../../config';
import styles from './styles';
import { SectionHeader, HtmlParser } from '../../generic';

const { textCasing } = appConstants;
const { PageContentContext } = appContexts;

class FeaturesAndBenefit extends Component {
  constructor(props) {
    super(props);
    const { layoutData } = this.props;
    this.state = {
      layoutData,
      imagesArr: ['', '', '']
    };
  }

  componentDidMount() {
    const { layoutData } = this.state;
    const imgUrlArr = [];
    layoutData.map((item1, index) => {
      if (index > 2) return null;
      let imgUrl = '';
      if (item1.images) {
        item1.images.map((item2) => {
          if (item2.type === 'full') {
            if (item2.url) {
              const imageName = item2.url.split('/').pop();
              if (imageName !== 'placeholder.jpg') {
                imgUrlArr.push(item2.url);
                imgUrl = item2.url;
              }
            }
          }
          return null;
        });
      }
      if (imgUrl === '') {
        imgUrlArr.push('');
      }
      return null;
    });
    this.setState({
      imagesArr: imgUrlArr
    });
  }

  renderImageItem = ({ item, index }) => {
    const { imagesArr } = this.state;
    const { pageId } = this.context;

    let desc = '';
    item.benefits.map((benefit, benefitIndex) => {
      const prefix = benefitIndex !== 0 ? ' ' : '';
      desc += prefix + benefit;
      return null;
    });
    return (
      <View style={styles.imgListItem}>
        {
          imagesArr[index] ? (
            <DcaImage
              url={imagesArr[index]}
              imageStyle={styles.imgListItemImg}
              wrapStyle={styles.imgListItemImgWrap}
              resizeMode="cover"
              showEnlargedImage
            />
          ) : null
        }
        <View style={styles.imgListItemContent}>
          {
            item.feature ? (
              <HtmlParser
                html={item.feature}
                textKey={`prodD-featuresAndBenefit-gridItem-head-${pageId}-${index}`}
                style={styles.imgListItemImgHeadTxt}
              />
            ) : null
          }
          {
            desc ? (
              <HtmlParser
                html={desc}
                textKey={`prodD-featuresAndBenefit-gridItem-desc-${pageId}-${index}`}
                style={styles.imgListItemImgHeadDesc}
              />
            ) : null
          }

        </View>
      </View>
    );
  }

  renderGroupItem = ({ item, index }) => {
    const { pageId } = this.context;
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 2, margin: 10, padding: 15 }} />;
    const listArr = [];
    item.benefits.map((item1, index1) => {
      const benifitKey = `featureSubItem_${helpers.strToKey(item1)}-${index1}`;
      listArr.push((
        <View style={styles.groupSubItem} key={benifitKey}>
          <View style={styles.bullet} />
          <HtmlParser
            html={item1}
            textKey={`prodD-featuresAndBenefit-listItem-desc-${pageId}-${benifitKey}`}
            style={styles.groupSubItemTxt}
          />
        </View>
      ));
      return null;
    });
    if (listArr.length === 0) return null;
    return (
      <View style={styles.groupItem}>
        <HtmlParser
          html={item.feature}
          textKey={`prodD-featuresAndBenefit-listItem-head-${pageId}-${index}`}
          style={styles.groupItemHead}
        />
        {listArr}
      </View>
    );
  }

  render() {
    const { layoutData, imagesArr } = this.state;
    const { pageId, translations } = this.context;

    const urlCount = imagesArr.length;

    let listDataArr = [];
    let imageDataArr = [];
    if (layoutData.length > 3) {
      listDataArr = layoutData.slice(3, layoutData.length);
    }
    if (layoutData.length >= 3 && urlCount === 3) {
      imageDataArr = layoutData.slice(0, 3);
    } else {
      listDataArr = layoutData.slice(0, layoutData.length);
    }

    const arrMod = listDataArr.length % 2;
    for (let i = 0; i < arrMod; i += 1) {
      listDataArr.push({});
    }
    return (
      <View style={styles.wrap}>
        <SectionHeader
          heading={tr(translations, 'feature_and_benefits', 'Feature and Benefits', textCasing.U)}
          marking
          textKey={`prodD-featuresAndBenefit-head-${pageId}`}
        />
        <FlatList
          extraData={this.state}
          data={imageDataArr}
          renderItem={this.renderImageItem}
          contentContainerStyle={styles.imgListItemContainer}
          columnWrapperStyle={styles.imgListItemColContainer}
          keyExtractor={(item, index) => `features_${index}`}
          scrollEnabled={false}
          numColumns={3}
        />
        <FlatList
          extraData={this.state}
          data={listDataArr}
          renderItem={this.renderGroupItem}
          contentContainerStyle={styles.groupListItemContainer}
          columnWrapperStyle={styles.groupListItemColContainer}
          keyExtractor={(item, index) => `benefits_${index}`}
          scrollEnabled={false}
          numColumns={2}
        />
      </View>
    );
  }
}

FeaturesAndBenefit.contextType = PageContentContext;
export default FeaturesAndBenefit;
