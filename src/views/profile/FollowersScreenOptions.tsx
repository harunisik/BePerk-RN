import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {useCustomMutation as useMutation} from '../../hooks/commonHooks';
import {chatShare as userChatShare} from '../../services/ChatService';

const HeaderRight = ({navigation, route}) => {
  const {
    params: {id, type, selectedUsers},
  } = route;

  const chatShare = useMutation(userChatShare);

  const handlePressSent = () => {
    if (!selectedUsers || selectedUsers.length === 0) {
      showMessage({message: 'Please select users', type: 'warning'});
    } else {
      chatShare.mutate(
        {
          id,
          type,
          share_to: JSON.stringify(selectedUsers.map(({user_id}) => user_id)),
        },
        {
          onSuccess: () => {
            navigation.goBack();
            showMessage({message: 'Message sent'});
          },
        },
      );
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
