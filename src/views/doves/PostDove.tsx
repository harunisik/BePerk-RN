import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {useMutation} from '../../hooks/customHooks';
import {addPerk as userAddPerk} from '../../services/UserService';
import Text from '../../components/common/Text';

const PostButton = ({onPress}) => {
  return (
    <Text onPress={onPress} style={{color: 'dodgerblue'}}>
      Post
    </Text>
  );
};

export const PostDoveScreenOptions = ({navigation, route}) => {
  return {
    headerShown: true,
    title: route.params.title,
    animation: 'slide_from_bottom',
    // presentation: 'fullScreenModal',
    headerLeft: () => (
      <MaterialCommunityIcons
        name="close"
        onPress={() => navigation.goBack()}
        size={26}
        color="dodgerblue"
      />
    ),
    headerRight: PostButton,
  };
};

const PostDove = () => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [caption, setCaption] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const toggleSwitch = () => setIsAnonymous(previousState => !previousState);
  const navigation = useNavigation();
  const route = useRoute();
  const {p15, row, rGap15, jcSpaceBetween, aiCenter} = common;
  const {
    params: {inputTextPlaceHolder, subtype},
  } = route;

  const addPerk = useMutation(userAddPerk);

  const handlePressPost = () => {
    if (!caption) {
      showMessage({message: 'Please type something', type: 'warning'});
    } else {
      setShowIndicator(true);
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
            showMessage({message: 'Message sent'});
            navigation.goBack();
          },
        },
      );
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <PostButton onPress={handlePressPost} />,
    });
  }, [navigation, caption, isAnonymous]);

  return (
    <View style={[p15, rGap15]}>
      {showIndicator && <ActivityIndicator />}
      <TextInput
        placeholder={inputTextPlaceHolder}
        onChangeText={setCaption}
        value={caption}
        style={[styles.textInput, styles.shadowProp]}
        multiline
        numberOfLines={20}
      />
      <View style={[row, jcSpaceBetween, aiCenter]}>
        <Text>Anonymous</Text>
        <Switch onValueChange={toggleSwitch} value={isAnonymous} />
      </View>
      <Text>400</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 200,
    padding: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: 'white',
  },
});

export default PostDove;
