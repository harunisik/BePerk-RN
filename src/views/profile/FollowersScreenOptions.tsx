import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {useCustomMutation as useMutation} from '../../hooks/customHooks';
import {chatShare as userChatShare} from '../../services/ChatService';
import {useNavigation, useRoute} from '@react-navigation/native';
import NewPost from '../add/NewPost';
import {postMy24 as userPostMy24} from '../../services/My24Service';

export const HeaderRight3 = ({formData}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {selectedUsers},
  } = route;

  const postMy24 = useMutation(userPostMy24);

  const handlePressPost = () => {
    formData.append(
      'send_users',
      selectedUsers.length > 0
        ? JSON.stringify(selectedUsers.map(({user_id}) => user_id))
        : '',
    );

    postMy24.mutate(formData, {
      onSuccess: () => {
        showMessage({message: 'New post sent'});
        navigation.goBack();
        navigation.goBack();
      },
    });
  };

  return (
    <Text style={{color: 'dodgerblue'}} onPress={handlePressPost}>
      Post
    </Text>
  );
};

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
  [HeaderRight3.name]: HeaderRight3,
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
    // presentation: 'fullScreenModal',
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
