import React, { Component } from 'react';
import { View } from 'react-native';
// import { Provider } from 'react-redux';
// import configureStore from './Redux/configureStrore';
import RootNavigation from './navigation/rootNavigation';
import { requestPermission } from './config';

// const store = configureStore();
// const client = new ApolloClient({
//   uri: globals.SERVER_URL,
//   request: (operation) => {
//     operation.setContext({
//       headers: {
//         authorization: '',
//       },
//     });
//   },
// });

class App extends Component {
  componentDidMount() {
    requestPermission();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Provider store={store}> */}
        <RootNavigation />
        {/* </Provider> */}
      </View>
    );
  }
}

export default App;
