import {ActivityIndicator} from 'react-native';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import UserItem from '../../components/profile/UserItem';
import SelectedUsers from '../../components/profile/SelectedUsers';
import {useSearchText, useSearchUsers} from '../../hooks/searchHooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from '../../hooks/reactQueryHooks';
import {getUserFollowing} from '../../services/UserService';
import FlatList from '../../components/common/FlatList';
import {showMessage} from 'react-native-flash-message';
import {chatAdd, chatShare} from '../../services/ChatService';
import NewPost from '../add/NewPost';
import {postMy24} from '../../services/My24Service';
import MessageDetails from './MessageDetails';
import Text from '../../components/common/Text';
import View from '../../components/common/View';
import {CloseIcon} from '../../components/common/Icons';
import {useColors} from '../../hooks/customHooks';
import TextInput from '../../components/common/TextInput';

const {bold, pl15, pr15, pb20, rGap20, pv10} = common;

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
    <Text style={{color: '#0AAEEF'}} onPress={handlePressPost}>
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
    <Text style={{color: '#0AAEEF'}} onPress={handlePressTag}>
      Tag
    </Text>
  );
};

export const MessagesHeaderRight = ({selectedUsers}) => {
  const navigation = useNavigation();

  const chatAddApi = useMutation(chatAdd);

  const handlePressChat = () => {
    if (!selectedUsers || selectedUsers.length === 0) {
      showMessage({message: 'Please select users', type: 'warning'});
    } else {
      chatAddApi.mutate(
        {to_users: JSON.stringify(selectedUsers.map(({user_id}) => user_id))},
        {
          onSuccess: ({id}) => {
            navigation.goBack(),
              navigation.navigate({
                name: MessageDetails.name,
                params: {
                  chatId: id,
                  title: selectedUsers.map(({fullname}) => fullname).join(', '),
                  isMultiple: selectedUsers.length > 1,
                },
              });
          },
        },
      );
    }
  };

  return (
    <Text style={{color: '#0AAEEF'}} onPress={handlePressChat}>
      Chat
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
    <Text style={{color: '#0AAEEF'}} onPress={handlePressSent}>
      Sent
    </Text>
  );
};

const HEADER_LIST = {
  [ChatShareHeaderRight.name]: ChatShareHeaderRight,
  [NewPostHeaderRight.name]: NewPostHeaderRight,
  [NewStoryHeaderRight.name]: NewStoryHeaderRight,
  [MessagesHeaderRight.name]: MessagesHeaderRight,
};

export const UserSearchScreenOptions = ({navigation, route}) => {
  return {
    title: 'Search users',
    animation: 'slide_from_bottom',
    ...(route.params?.presentation !== 'none' && {
      presentation: 'fullScreenModal',
    }),
    headerShown: true,
    headerLeft: () => <CloseIcon onPress={() => navigation.goBack()} />,
    headerRight: () => <Text style={{color: '#0AAEEF'}}>Sent</Text>,
  };
};

const UserSearch = () => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const {theme} = useColors();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {headerRightComp, headerRightProps},
  } = route;

  const HeaderRightComp = HEADER_LIST[headerRightComp];

  const {data, refetch, isFetching} = useQuery(getUserFollowing);

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
    <View style={[pv10, {paddingHorizontal: 15, rowGap: 15, flex: 1}]}>
      {showIndicator && <ActivityIndicator />}
      <TextInput
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        style={{
          borderRadius: 20,
        }}
      />

      {selectedUsers?.length > 0 && <SelectedUsers data={selectedUsers} />}

      {searchText ? (
        <FlatList
          data={searchResult}
          renderItem={({item}) => (
            <UserItem
              item={item}
              onPress={handlePressUserItem}
              selectable
              disableNavigation
            />
          )}
          keyExtractor={item => item.user_id}
        />
      ) : (
        <FlatList
          data={data?.following}
          renderItem={({item}) => (
            <UserItem
              item={item}
              onPress={handlePressUserItem}
              selectable
              disableNavigation
            />
          )}
          keyExtractor={item => item.user_id}
          onRefresh={refetch}
          refreshing={isFetching}
          ListHeaderComponent={<Text style={[bold, pb20]}>Suggested</Text>}
        />
      )}
    </View>
  );
};

export default UserSearch;
