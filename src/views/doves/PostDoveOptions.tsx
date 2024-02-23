import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAddPerk} from '../../hooks/userHooks';
import {showMessage} from 'react-native-flash-message';

const HeaderRight = ({navigation, route}) => {
  const {
    params: {caption, isAnonymous, subtype, navigateTo},
  } = route;

  const handleAddPerk = useAddPerk(() => {
    navigation.navigate(navigateTo, {doRefresh: true});
    showMessage({message: 'Message sent'});
  });

  const handlePressPost = () => {
    if (!caption) {
      showMessage({message: 'Please type something', type: 'warning'});
    } else {
      handleAddPerk.mutate({
        anonymous: isAnonymous ? 1 : 0,
        caption,
        comments: 1,
        comments_private: 0,
        likes: 1,
        likes_private: 0,
        subtype,
      });
    }
  };

  return <Text onPress={handlePressPost}>Post</Text>;
};

const PostDoveOptions = ({navigation, route}) => {
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

export default PostDoveOptions;
