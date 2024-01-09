import * as React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styles from './src/styles';
import {StoreContainer} from './src/containers/StoreContainer';
import NavigationLayout from './src/views/Navigators';

function App(): React.JSX.Element {
  return (
    <StoreContainer>
      <GestureHandlerRootView style={styles.flex1}>
        <NavigationLayout />
      </GestureHandlerRootView>
    </StoreContainer>
  );
}

export default App;
