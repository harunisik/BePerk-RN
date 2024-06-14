import * as React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import common from './src/styles/sharedStyles';
import {StoreContainer} from './src/containers/StoreContainer';
import MainStack from './src/views/MainStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import FlashMessage from 'react-native-flash-message';
import axios from 'axios';
import {Platform} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {FullWindowOverlay} from 'react-native-screens';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const queryClient = new QueryClient();

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers.common['ACCEPT-VERSION'] = 3;

if (process.env.APP_DEBUG === 'true') {
  // if (Platform.OS === 'android') {
  //   console.log('Platform.OS is android');
  //   axios.defaults.baseURL = process.env.API_URL_ANDROID;
  // }

  console.log(`baseUrl: ${axios.defaults.baseURL}`);

  axios.interceptors.request.use(request => {
    const {headers, baseURL, method, url, data} = request;
    // console.log(
    //   'Starting Request',
    //   JSON.stringify({headers, baseURL, method, url, data}, null, 2),
    // );
    // console.log('Starting Request', baseURL + url);
    return request;
  });

  axios.interceptors.response.use(response => {
    const {
      status,
      request: {responseURL, _method},
    } = response;
    // console.log(
    //   'Starting Response',
    //   JSON.stringify({status, responseURL}, null, 2),
    // );
    console.log('Received response:', status, _method, responseURL);

    return response;
  });
}

// if (__DEV__) {
//   import('react-query-native-devtools').then(({addPlugin}) => {
//     addPlugin({queryClient});
//   });
// }

const {flex1} = common;

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContainer>
        <GestureHandlerRootView style={flex1}>
          <PaperProvider>
            <BottomSheetModalProvider>
              <MainStack />
            </BottomSheetModalProvider>
            {Platform.OS === 'ios' && (
              <FullWindowOverlay>
                <FlashMessage />
              </FullWindowOverlay>
            )}
          </PaperProvider>
          <FlashMessage position="top" />
        </GestureHandlerRootView>
      </StoreContainer>
    </QueryClientProvider>
  );
}

export default App;
