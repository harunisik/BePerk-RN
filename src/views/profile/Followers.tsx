import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import UserItem from '../../components/profile/UserItem';
import SelectedUsers from '../../components/profile/SelectedUsers';
import {useSearchText, useSearchUsers} from '../../hooks/searchHooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useCustomMutation as useMutation,
  useCustomQuery as useQuery,
} from '../../hooks/customHooks';
import {getUserFollowings} from '../../services/UserService';
import FlatList from '../../components/common/FlatList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {chatShare} from '../../services/ChatService';
import NewPost from '../add/NewPost';
import {postMy24} from '../../services/My24Service';

const {bold, font16, pl15, pr15, pb10, pt10} = common;

export const NewStoryHeaderRight = ({formData, selectedUsers, onPress}) => {
  const navigation = useNavigation();

  const postMy24Api = useMutation(postMy24);

  const handlePressPost = () => {
    onPress();

    formData.append(
      'send_users',
      selectedUsers.length > 0
        ? JSON.stringify(selectedUsers.map(({user_id}) => user_id))
        : '',
    );

    postMy24Api.mutate(formData, {
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

export const NewPostHeaderRight = ({selectedUsers}) => {
  const navigation = useNavigation();

  const handlePressTag = () => {
    navigation.navigate({
      name: NewPost.name,
      params: {
        selectedUsers: selectedUsers.map(({fullname, user_id}) => {
          return {fullname, user_id};
        }),
      },
      merge: true,
    });
  };

  return (
    <Text style={{color: 'dodgerblue'}} onPress={handlePressTag}>
      Tag
    </Text>
  );
};

export const ChatShareHeaderRight = ({
  itemId,
  type,
  onPress,
  selectedUsers,
}) => {
  const navigation = useNavigation();

  const chatShareApi = useMutation(chatShare);

  const handlePressSent = () => {
    if (!selectedUsers || selectedUsers.length === 0) {
      showMessage({message: 'Please select users', type: 'warning'});
    } else {
      onPress();
      chatShareApi.mutate(
        {
          id: itemId,
          type,
          share_to: JSON.stringify(selectedUsers.map(({user_id}) => user_id)),
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

  return (
    <Text style={{color: 'dodgerblue'}} onPress={handlePressSent}>
      Sent
    </Text>
  );
};

const HEADER_LIST = {
  [ChatShareHeaderRight.name]: ChatShareHeaderRight,
  [NewPostHeaderRight.name]: NewPostHeaderRight,
  [NewStoryHeaderRight.name]: NewStoryHeaderRight,
};

export const FollowersScreenOptions = ({navigation}) => {
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
    // headerRight: HeaderRight,
  };
};

const Followers = () => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {headerRightComp, headerRightProps},
  } = route;

  const HeaderRightComp = HEADER_LIST[headerRightComp];

  const {data, refetch, isFetching} = useQuery(getUserFollowings);

  const searchUsers = useSearchUsers();

  const handlePressUserItem = (item, isSelected) => {
    setSelectedUsers(prev => {
      if (isSelected) {
        return [...prev, item];
      }
      return prev.filter(({user_id}) => user_id !== item.user_id);
    });
  };

  const handlePressPost = async () => {
    setShowIndicator(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightComp
          {...headerRightProps}
          onPress={handlePressPost}
          selectedUsers={selectedUsers}
        />
      ),
    });
  }, [navigation, headerRightComp, headerRightProps, selectedUsers]);

  useSearchText(
    searchText,
    () =>
      searchUsers.mutate(
        {limit: 50, offset: 0, username: searchText},
        {
          onSuccess: ({profiles}) =>
            setSearchResult(
              profiles?.map(profile => ({...profile, user_id: profile.id})),
            ),
        },
      ),
    () => setSearchResult([]),
  );

  return (
    <View style={[pl15, pr15]}>
      {showIndicator && <ActivityIndicator />}
      <TextInput
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        style={styles.textInput}
      />

      <SelectedUsers data={selectedUsers} />

      {searchText ? (
        <FlatList
          data={searchResult}
          renderItem={({item}) => (
            <UserItem item={item} onPress={handlePressUserItem} selectable />
          )}
          keyExtractor={item => item.user_id}
        />
      ) : (
        <FlatList
          data={data?.following}
          renderItem={({item}) => (
            <UserItem item={item} onPress={handlePressUserItem} selectable />
          )}
          keyExtractor={item => item.user_id}
          onRefresh={refetch}
          refreshing={isFetching}
          ListHeaderComponent={
            <Text style={[bold, font16, pb10, pt10]}>Suggested</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Followers;
