import * as React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import common from './src/styles/sharedStyles';
import {StoreContainer} from './src/containers/StoreContainer';
import NavigationLayout from './src/views/NavigationLayout';

function App(): React.JSX.Element {
  return (
    <StoreContainer>
      <GestureHandlerRootView style={common.flex1}>
        <NavigationLayout />
      </GestureHandlerRootView>
    </StoreContainer>
  );
}

export default App;
