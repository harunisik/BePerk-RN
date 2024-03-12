import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {useCustomMutation as useMutation} from '../../hooks/commonHooks';
import {addPerk as userAddPerk} from '../../services/UserService';

const HeaderRight = ({navigation, route}) => {
  const {
    params: {caption, isAnonymous, subtype},
  } = route;

  const addPerk = useMutation(userAddPerk);

  const handlePressPost = () => {
    if (!caption) {
      showMessage({message: 'Please type something', type: 'warning'});
    } else {
      addPerk.mutate(
        {
          anonymous: isAnonymous ? 1 : 0,
          caption,
          comments: 1,
          comments_private: 0,
          likes: 1,
          likes_private: 0,
          subtype,
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

  return <Text onPress={handlePressPost}>Post</Text>;
};

const PostDoveScreenOptions = ({navigation, route}) => {
  return {
    title: route.params.title,
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

export default PostDoveScreenOptions;
