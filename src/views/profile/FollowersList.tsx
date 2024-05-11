import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import common from '../../styles/sharedStyles';
import {
  addFollowing,
  deleteFollowing,
  getUserFollowers,
  getUserFollowing,
} from '../../services/UserService';
import {useMutation, useQuery} from '../../hooks/customHooks';
import FlatList from '../../components/common/FlatList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const {pl15, pr15, row, aiCenter, cGap10} = common;

const UserItem = ({item}) => {
  const [isFollowing, setIsFollowing] = useState(item.i_following === 0);

  const addFollowingApi = useMutation(addFollowing);
  const deleteFollowingApi = useMutation(deleteFollowing);

  // useEffect(() => {
  //   setIsFollowing(item.i_following === 0);
  // }, [item]);

  const handlePressFollowing = () => {
    if (isFollowing) {
      addFollowingApi.mutate(
        {id: item.user_id},
        {onSuccess: () => setIsFollowing(true)},
      );
    } else {
      deleteFollowingApi.mutate(
        {id: item.user_id},
        {onSuccess: () => setIsFollowing(false)},
      );
    }
  };

  return (
    <View style={[row, aiCenter, cGap10]}>
      <MaterialIcons name="account-circle" size={36} color="lightgray" />
      <Text>{item.fullname}</Text>
      {item.isVerified === 1 && (
        <MaterialIcons name="verified" size={16} color="dodgerblue" />
      )}
      <Pressable style={{marginLeft: 'auto'}} onPress={handlePressFollowing}>
        <Text>{isFollowing ? 'Follow' : 'Following'}</Text>
      </Pressable>
    </View>
  );
};

const FollowersList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {isFollowing},
  } = route;

  const {data, refetch, isFetching} = isFollowing
    ? useQuery(getUserFollowing)
    : useQuery(getUserFollowers);

  const userList = isFollowing ? data?.following : data?.followers;

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
  }, []);

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
          renderItem={({item}) => <UserItem item={item} />}
          keyExtractor={item => item.user_id}
        />
      ) : (
        <FlatList
          data={userList}
          renderItem={({item}) => <UserItem item={item} />}
          keyExtractor={item => item.user_id}
          onRefresh={refetch}
          refreshing={isFetching}
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

export default FollowersList;
