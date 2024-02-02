import * as React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import common from './src/styles/sharedStyles';
import {StoreContainer} from './src/containers/StoreContainer';
import MainStack from './src/views/MainStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import FlashMessage from 'react-native-flash-message';

const queryClient = new QueryClient();

// if (__DEV__) {
//   import('react-query-native-devtools').then(({addPlugin}) => {
//     addPlugin({queryClient});
//   });
// }

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContainer>
        <GestureHandlerRootView style={common.flex1}>
          <MainStack />
          <FlashMessage position="top" />
        </GestureHandlerRootView>
      </StoreContainer>
    </QueryClientProvider>
  );
}

export default App;
