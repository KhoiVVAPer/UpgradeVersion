import React, { Component } from 'react';
import {
    View, Text
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import {
    MainHoc
} from '../../custom';
import {
    appConstants,
    fonts,appContexts,helpers
} from '../../../config';
import styles from './styles';
import WebView from 'react-native-webview';
import { rootNavigation } from '../../../navigation';
const { MainHocContext } = appContexts;
const {
    routes,
} = appConstants

class ProductFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.checkboxGroupRef = null;
        this.scrollY = 0;
        this.commandListener = Navigation.events().registerCommandListener((name, params) => {
            console.log('back button in product finder', name, params)
        });
    }

    componentDidMount() {
        const { componentId } = this.context;
        // Navigation.push(
        //     componentId,
        //     rootNavigation.pageContent({
        //         passProps: { pageId: 10484707 }
        //     })
        // );
    }

    componentWillUnmount() {
        this.commandListener.remove();
    }

    render() {

        return (
            <View style={styles.wrap}>
                <View style={styles.productFilterWrap}>

                    <View style={styles.productFilterHeaderWrap}>
                        <Text style={{ fontSize: 27, ...fonts.banner }}>PRODUCT FINDER</Text>
                    </View>
                    <View style={styles.productFilterFooterWrap}>
                        <WebView
                            scalesPageToFit={true}
                            source={{ uri: 'https://tiger-cdn.zoovu.com/advisor-fe-web/api/v1/advisors/SdTZMDDc/iframe-loader?locale=de-DE' }}

                        />
                    </View>

                </View>




            </View>
        );
    }
}
const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => ({
});
const ProductFinderRedux = connect(mapStateToProps, mapDispatchToProps)(ProductFinder);
ProductFinder.contextType = MainHocContext;
export default MainHoc({
    screen: routes.PRODUCTFINDER,
    breadCrumb: true
})(ProductFinderRedux);
