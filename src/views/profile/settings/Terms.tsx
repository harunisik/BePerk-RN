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
  return (
    <View style={common.centered}>
      <Text>Terms Under construction!</Text>
    </View>
  );
};

export default Terms;
