import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStore} from '../../containers/StoreContainer';
import {showMessage} from 'react-native-flash-message';
import {useChatShare} from '../../hooks/chatHooks';

const HeaderRight = ({navigation, comment}) => {
  const {
    store: {selectedUsers},
  } = useStore();

  const handleChatShare = useChatShare(() => navigation.goBack());

  const handlePressSent = () => {
    if (!selectedUsers || selectedUsers.length === 0) {
      showMessage({message: 'Please select users', type: 'warning'});
    } else {
      handleChatShare.mutate({
        id: comment.id,
        share_to: JSON.stringify(selectedUsers.map(({user_id}) => user_id)),
        type: comment.type,
      });
    }
  };

  return <Text onPress={handlePressSent}>Sent</Text>;
};

const FollowersOptions = ({
  navigation,
  route: {
    params: {comment},
  },
}) => {
  return {
    animation: 'slide_from_bottom',
    headerLeft: () => (
      <MaterialCommunityIcons
        name="close"
        onPress={() => navigation.goBack()}
        size={26}
      />
    ),
    headerRight: () => (
      <HeaderRight navigation={navigation} comment={comment} />
    ),
  };
};

export default FollowersOptions;
