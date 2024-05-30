import {Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';

const {row, flex1, aiCenter, jcCenter, jcSpaceBetween} = common;

export const InviteListItem = () => {
  const navigation = useNavigation();
  const title = 'Invite';

  return (
    <Pressable
      onPress={() => navigation.navigate(Invite.name)}
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{title}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
  );
};

const Invite = () => {
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Invite is under construction!</Text>
    </View>
  );
};

export default Invite;
