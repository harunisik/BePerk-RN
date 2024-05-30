import {Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';

const {row, flex1, aiCenter, jcCenter, jcSpaceBetween} = common;

export const RequestVerificationListItem = () => {
  const navigation = useNavigation();
  const title = 'Request verification';

  return (
    <Pressable
      onPress={() => navigation.navigate(RequestVerification.name)}
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{title}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
  );
};

const RequestVerification = () => {
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>RequestVerification is under construction!</Text>
    </View>
  );
};

export default RequestVerification;
