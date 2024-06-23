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
import View from '../../components/common/View';
import {colors, useColors} from '../../hooks/customHooks';
import TextInput from '../../components/common/TextInput';
import Button from '../../components/common/buttons/Button';

const {row, aiCenter} = common;

const UserItem = ({item, onPressFollow}) => {
  const {
    store: {
      userInfo: {userId},
    },
  } = useStore();
  const {theme} = useColors();
  return (
    <View style={[row, aiCenter]}>
      <AccountCard
        userId={item.user_id}
        username={item.fullname}
        photo={item.photo}
        usePush
      />
      {item.user_id !== userId && (
        <Button
          title={
            item.i_following === 1
              ? 'Following'
              : item.i_following === 2
                ? 'Requested'
                : 'Follow'
          }
          onPress={onPressFollow}
          style={{
            marginLeft: 'auto',
            backgroundColor:
              item.i_following === 0
                ? colors.blue
                : theme === 'dark'
                  ? 'rgb(40, 40, 40)'
                  : 'lightgray',
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}
        />
      )}
    </View>
  );
};

const FollowersList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const {theme2} = useColors();
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
    <View style={{padding: 15, rowGap: 10, flex: 1}}>
      <TextInput
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        style={{
          // flex: 1,
          borderRadius: 20,
          paddingHorizontal: 15,
        }}
        theme={theme2}
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

export default FollowersList;
