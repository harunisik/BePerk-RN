import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getUserFollowings} from '../../services/UserService';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {useStore} from '../../containers/StoreContainer';
import {FollowersActionType} from '../../containers/FollowersAction';
import {chatShare} from '../../services/ChatService';
import {showMessage} from 'react-native-flash-message';
import {searchUsers} from '../../services/SearchService';

const HeaderRight = ({comment, onShare}) => {
  const {
    store: {selectedUsers},
  } = useStore();

  const handleShareChat = useMutation({
    mutationFn: share => chatShare(share),
    onSuccess: () => {
      onShare();
      showMessage({message: 'Message sent', type: 'info'});
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  return (
    <Text
      onPress={() => {
        if (!selectedUsers || selectedUsers.length === 0) {
          showMessage({message: 'Please select users', type: 'warning'});
        } else {
          handleShareChat.mutate({
            id: comment.id,
            share_to: JSON.stringify(selectedUsers.map(({user_id}) => user_id)),
            type: comment.type,
          });
        }
      }}>
      Sent
    </Text>
  );
};

export const FollowersOptions = ({
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
      <HeaderRight comment={comment} onShare={() => navigation.goBack()} />
    ),
  };
};

const UserItem = ({item}) => {
  const [selected, setSelected] = useState(false);
  const {dispatch} = useStore();

  const handlePress = () => {
    setSelected(!selected);
    dispatch({
      type: !selected
        ? FollowersActionType.ADD_USER
        : FollowersActionType.DELETE_USER,
      user: item,
    });
  };

  const {flex1, aiCenter, row, jcSpaceBetween, pt10, pb10, cGap10} = common;

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[row, flex1, jcSpaceBetween, aiCenter, pb10, pt10]}>
        <View style={[row, aiCenter, cGap10]}>
          <MaterialCommunityIcons name="account" size={26} />
          <Text>{item.fullname}</Text>
          {item.isVerified === 1 && (
            <MaterialIcons name="verified" size={16} color="blue" />
          )}
        </View>
        <MaterialCommunityIcons
          name={selected ? 'check-circle' : 'circle-outline'}
          size={22}
          color={selected ? 'blue' : 'gray'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const Followers = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const {
    dispatch,
    store: {selectedUsers},
  } = useStore();

  const {
    bold,
    font16,
    pl15,
    pr15,
    pb10,
    pt10,
    p10,
    radius6,
    white,
    font11,
    row,
    cGap5,
  } = common;

  const {data, refetch, isFetching} = useQuery({
    queryKey: ['getUserFollowing'],
    queryFn: getUserFollowings,
  });

  const handleSearchUsers = useMutation({
    mutationFn: search => searchUsers(search),
    onSuccess: ({profiles}) => {
      setSearchResult(
        profiles.map(profile => ({...profile, user_id: profile.id})),
      );
      console.log(JSON.stringify(searchResult));
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.length === 0) {
        setSearchResult([]);
        return;
      }

      handleSearchUsers.mutate({
        limit: 50,
        offset: 0,
        username: searchText,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    return () => dispatch({type: FollowersActionType.CLEAR_LIST});
  }, []);

  return (
    <View style={[pl15, pr15]}>
      <TextInput
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        style={styles.textInput}
      />

      <ScrollView>
        <View style={[row, cGap5]}>
          {selectedUsers?.map(item => {
            return (
              <View
                key={item.user_id}
                style={[radius6, p10, {backgroundColor: 'blue'}]}>
                <Text style={[white, font11]}>{item.fullname}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {searchText ? (
        <FlatList
          data={searchResult}
          renderItem={({item}) => <UserItem item={item} />}
          keyExtractor={item => item.user_id}
        />
      ) : (
        <FlatList
          data={data?.following}
          renderItem={({item}) => <UserItem item={item} />}
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
    width: 200,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Followers;
