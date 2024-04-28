import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {useCustomMutation as useMutation} from '../../hooks/commonHooks';
import {chatShare as userChatShare} from '../../services/ChatService';
import {useNavigation, useRoute} from '@react-navigation/native';
import NewPost from '../add/NewPost';

export const HeaderRight2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {selectedUsers},
  } = route;

  const handlePressTag = () => {
    navigation.navigate(NewPost.name, {
      selectedUsers: selectedUsers.map(({fullname, user_id}) => {
        return {fullname, user_id};
      }),
    });
  };

  return (
    <Text style={{color: 'dodgerblue'}} onPress={handlePressTag}>
      Tag
    </Text>
  );
};

export const HeaderRight1 = ({itemId, type}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {selectedUsers},
  } = route;

  const chatShare = useMutation(userChatShare);

  const handlePressSent = () => {
    if (!selectedUsers || selectedUsers.length === 0) {
      showMessage({message: 'Please select users', type: 'warning'});
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
  };

  return (
    <Text style={{color: 'dodgerblue'}} onPress={handlePressSent}>
      Sent
    </Text>
  );
};

const HEADER_LIST = {
  [HeaderRight1.name]: HeaderRight1,
  [HeaderRight2.name]: HeaderRight2,
};

const HeaderRight = () => {
  const route = useRoute();
  const {
    params: {headerRightComp, headerRightProp},
  } = route;

  const HeaderRightComp = HEADER_LIST[headerRightComp];

  return <HeaderRightComp {...headerRightProp} />;
};

const FollowersScreenOptions = ({navigation}) => {
  return {
    animation: 'slide_from_bottom',
    presentation: 'fullScreenModal',
    headerShown: true,
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
