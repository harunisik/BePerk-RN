import {Image} from 'react-native';
import View from '../components/common/View';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: 80, height: 80}}
        source={require('../assets/beperk_logo.png')}
      />
    </View>
  );
};

export default SplashScreen;
