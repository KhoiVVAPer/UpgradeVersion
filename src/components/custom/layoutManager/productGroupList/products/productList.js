import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  appContexts,
  helpers,
  appConstants,
  tr,
  appStyles
} from '../../../../../config';
import { Button } from '../../../generic';
import Product from './product';
import styles from './styles';

const { textCasing } = appConstants;
const { PageContentContext } = appContexts;

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderItem = ({ item, index }) => {
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 4, margin: 10 }} />;
    const { pageId } = this.context;
    return (
      <Product
        productData={item}
        textKey={`productList-${pageId}-${index}-${item.id}`}
      />
    );
  }

  render() {
    const { translations } = this.context;
    const { productArr, loadedProductArr, loadMoreProduct } = this.props;

    const remaining = productArr.length - loadedProductArr.length;

    const showMoreTxt = `${tr(translations, 'show_more', 'SHOW MORE', textCasing.U)} (${remaining} ${tr(translations, 'product_left', 'PRODUCTS LEFT', textCasing.U)})`;

    const arr = loadedProductArr;
    const arrMod = arr.length % 4;
    for (let i = 0; i < arrMod; i += 1) {
      arr.push({});
    }

    return (
      <View style={{ ...appStyles.mgT(10) }}>
        <FlatList
          extraData={this.state}
          data={arr}
          renderItem={this.renderItem}
          contentContainerStyle={styles.productListContainer}
          columnWrapperStyle={styles.productListColContainer}
          keyExtractor={(item) => `product_list_${item.id}`}
          scrollEnabled={false}
          numColumns={4}
        />
        {
          remaining > 0 ? (
            <View style={styles.showMoreBtn}>
              <Button
                onPress={() => loadMoreProduct()}
                text={showMoreTxt}
                theme="app"
                dcaTest="showMore"
              />
            </View>
          ) : null
        }
      </View>
    );
  }
}

ProductList.propTypes = {
  productArr: PropTypes.arrayOf(PropTypes.any).isRequired,
  loadedProductArr: PropTypes.arrayOf(PropTypes.any).isRequired,
};

PageContentContext.contextType = ProductList;
export default ProductList;
