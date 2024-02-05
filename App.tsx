import * as React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import common from './src/styles/sharedStyles';
import {StoreContainer} from './src/containers/StoreContainer';
import MainStack from './src/views/MainStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import FlashMessage from 'react-native-flash-message';
import axios from 'axios';
import {Platform} from 'react-native';

const queryClient = new QueryClient();
axios.defaults.baseURL = process.env.API_URL;

if (process.env.APP_DEBUG === 'true') {
  if (Platform.OS === 'android') {
    console.log('Platform.OS is android');
    axios.defaults.baseURL = process.env.API_URL_ANDROID;
  }

  console.log(axios.defaults.baseURL);

  axios.interceptors.request.use(request => {
    const {headers, baseURL, method, url} = request;
    console.log(
      'Starting Request',
      JSON.stringify({headers, baseURL, method, url}, null, 2),
    );
    return request;
  });

  axios.interceptors.response.use(response => {
    const {
      data,
      status,
      request: {responseURL},
    } = response;
    console.log(
      'Starting Response',
      JSON.stringify({data, status, responseURL}, null, 2),
    );
    return response;
  });
}

// if (__DEV__) {
//   import('react-query-native-devtools').then(({addPlugin}) => {
//     addPlugin({queryClient});
//   });
// }

function App(): React.JSX.Element {
  const {flex1} = common;

  return (
    <QueryClientProvider client={queryClient}>
      <StoreContainer>
        <GestureHandlerRootView style={flex1}>
          <MainStack />
          <FlashMessage position="top" />
        </GestureHandlerRootView>
      </StoreContainer>
    </QueryClientProvider>
  );
}

export default App;
