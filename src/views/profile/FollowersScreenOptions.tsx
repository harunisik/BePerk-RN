import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {useChatShare} from '../../hooks/chatHooks';

const HeaderRight = ({navigation, route}) => {
  const {
    params: {id, type, selectedUsers},
  } = route;

  const handleChatShare = useChatShare(() => navigation.goBack());

  const handlePressSent = () => {
    if (!selectedUsers || selectedUsers.length === 0) {
      showMessage({message: 'Please select users', type: 'warning'});
    } else {
      handleChatShare.mutate({
        id,
        type,
        share_to: JSON.stringify(selectedUsers.map(({user_id}) => user_id)),
      });
    }
  };

  return <Text onPress={handlePressSent}>Sent</Text>;
};

const FollowersScreenOptions = ({navigation, route}) => {
  return {
    animation: 'slide_from_bottom',
    headerLeft: () => (
      <MaterialCommunityIcons
        name="close"
        onPress={() => navigation.goBack()}
        size={26}
      />
    ),
    headerRight: () => <HeaderRight navigation={navigation} route={route} />,
  };
};

export default FollowersScreenOptions;
