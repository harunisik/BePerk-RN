import {Text, View} from 'react-native';
import common from '../../styles/sharedStyles';

const Home = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Home Under construction!</Text>
    </View>
  );
};

export default Home;
