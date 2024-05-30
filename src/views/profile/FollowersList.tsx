import {Pressable, StyleSheet, TextInput} from 'react-native';
import common from '../../styles/sharedStyles';
import {
  addFollowing,
  deleteFollowing,
  getUserFollowers,
  getUserFollowing,
} from '../../services/UserService';
import {useMutation, useQuery} from '../../hooks/reactQueryHooks';
import FlatList from '../../components/common/FlatList';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Popup from '../../components/common/Popup';
import {showMessage} from 'react-native-flash-message';
import {useStore} from '../../containers/StoreContainer';
import AccountCard from '../../components/common/AccountCard';
import Text from '../../components/common/Text';
import View from '../../components/common/View';

const {pl15, pr15, row, aiCenter} = common;

const UserItem = ({item, onPressFollow}) => {
  const {
    store: {
      authResult: {id},
    },
  } = useStore();

  return (
    <View style={[row, aiCenter]}>
      <AccountCard
        userId={item.user_id}
        username={item.fullname}
        photo={item.photo}
        usePush
      />
      {item.user_id !== id && (
        <Pressable
          style={{
            marginLeft: 'auto',
            backgroundColor:
              item.i_following === 0 ? 'dodgerblue' : 'lightgray',
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}
          onPress={onPressFollow}>
          {item.i_following === 1 ? (
            <Text style={{color: 'black'}}>Following</Text>
          ) : item.i_following === 2 ? (
            <Text style={{color: 'black'}}>Requested</Text>
          ) : (
            <Text style={{color: 'white'}}>Follow</Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

const FollowersList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {isFollowing, userId, isAuthUser},
  } = route;

  const {data, refetch, isFetching} = isFollowing
    ? useQuery(getUserFollowing, {...(!isAuthUser && {id: userId})})
    : useQuery(getUserFollowers, {...(!isAuthUser && {id: userId})});

  const userList = isFollowing ? data?.following : data?.followers;

  const addFollowingApi = useMutation(addFollowing);
  const deleteFollowingApi = useMutation(deleteFollowing);

  const handlePressFollow = item => {
    setSelectedItem(item);
    if (item?.i_following === 0) {
      followOrUnfollow(item);
    } else {
      setModalVisible(true);
    }
  };

  const followOrUnfollow = item => {
    if (item?.i_following === 0) {
      addFollowingApi.mutate(
        {id: item?.user_id},
        {
          onSuccess: () => {
            setSelectedItem(undefined);
            setModalVisible(false);
            showMessage({message: 'User is followed'});
          },
        },
      );
    } else {
      deleteFollowingApi.mutate(
        {id: item?.user_id},
        {
          onSuccess: () => {
            setSelectedItem(undefined);
            setModalVisible(false);
            showMessage({message: 'User is unfollowed'});
          },
        },
      );
    }
  };

  useEffect(
    () =>
      setSearchResult(
        userList?.filter(({fullname}) =>
          fullname.toLowerCase().includes(searchText.toLowerCase()),
        ),
      ),
    [searchText],
  );

  useEffect(() => {
    navigation.setOptions({title: isFollowing ? 'Following' : 'Followers'});
  }, [navigation]);

  return (
    <View style={[pl15, pr15]}>
      <TextInput
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        style={styles.textInput}
      />

      {searchText ? (
        <FlatList
          data={searchResult}
          renderItem={({item}) => (
            <UserItem
              item={item}
              onPressFollow={() => handlePressFollow(item)}
            />
          )}
          keyExtractor={(item, index) => `${item.user_id}_${index}`}
        />
      ) : (
        <FlatList
          data={userList}
          renderItem={({item}) => (
            <UserItem
              item={item}
              onPressFollow={() => handlePressFollow(item)}
            />
          )}
          keyExtractor={(item, index) => `${item.user_id}_${index}`}
          onRefresh={refetch}
          refreshing={isFetching}
        />
      )}
      <Popup
        visible={modalVisible}
        header={selectedItem?.fullname}
        message="Are you sure you want to unfollow?"
        onPressOk={() => followOrUnfollow(selectedItem)}
        onPressCancel={() => setModalVisible(false)}
      />
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

export default FollowersList;
