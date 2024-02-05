import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';

export const TermsListItem = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(Terms.name)}>
      <Text>Terms</Text>
    </TouchableOpacity>
  );
};

const Terms = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Terms Under construction!</Text>
    </View>
  );
};

export default Terms;
