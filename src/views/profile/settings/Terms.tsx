import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';

export const TermsListItem = () => {
  const navigation = useNavigation();
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
