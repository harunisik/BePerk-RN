import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {useCustomMutation as useMutation} from '../../hooks/commonHooks';
import {chatShare as userChatShare} from '../../services/ChatService';
import {useNavigation, useRoute} from '@react-navigation/native';

const HeaderRight = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {params: {itemId, type, selectedUsers, isChat} = {}} = route;

  const chatShare = useMutation(userChatShare);

  const handlePressSent = () => {
    if (!selectedUsers || selectedUsers.length === 0) {
      showMessage({message: 'Please select users', type: 'warning'});
    } else {
      if (isChat) {
      } else {
        chatShare.mutate(
          {
            id: itemId,
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
    }
  };

  return <Text onPress={handlePressSent}>{isChat ? 'Chat' : 'Sent'}</Text>;
};

const FollowersScreenOptions = ({navigation}) => {
  return {
    animation: 'slide_from_bottom',
    presentation: 'fullScreenModal',
    headerLeft: () => (
      <MaterialCommunityIcons
        name="close"
        onPress={() => navigation.goBack()}
        size={26}
      />
    ),
    headerRight: HeaderRight,
  };
};

export default FollowersScreenOptions;
