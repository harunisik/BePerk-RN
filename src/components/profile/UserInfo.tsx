import {View, Pressable} from 'react-native';
import common from '../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import FollowersList from '../../views/profile/FollowersList';
import WebView from '../common/WebView';
import AccountCard from '../common/AccountCard';
import Text from '../common/Text';

const {aiCenter, row, jcCenter, bold, blue, cGap50} = common;

const UserInfo = ({data, isAuthUser, userId}) => {
  const navigation = useNavigation();

  return (
    <View style={[aiCenter, jcCenter, {rowGap: 20}]}>
      <AccountCard
        userId={userId}
        username={data?.username}
        photo={data?.photo}
        vertical
        size={60}
      />

      <View style={[aiCenter, row, jcCenter, cGap50]}>
        <View style={[aiCenter]}>
          <Text style={[bold, blue]}>{data?.posts}</Text>
          <Text>Posts</Text>
        </View>
        <View style={[aiCenter]}>
          {!isAuthUser && data?.hide_followers === 1 ? (
            <Text style={[bold, blue]}>{data?.hide_followers_emoji}</Text>
          ) : (
            <Pressable
              onPress={() =>
                navigation.navigate(FollowersList.name, {
                  userId,
                  isFollowing: 0,
                  isAuthUser,
                })
              }>
              <Text style={[bold, blue]}>{data?.followers}</Text>
            </Pressable>
          )}
          <Text>Followers</Text>
        </View>
        <View style={[aiCenter]}>
          {!isAuthUser && data?.hide_followers === 1 ? (
            <Text style={[bold, blue]}>{data?.hide_following_emoji}</Text>
          ) : (
            <Pressable
              onPress={() =>
                navigation.navigate(FollowersList.name, {
                  userId,
                  isFollowing: 1,
                  isAuthUser,
                })
              }>
              <Text style={[bold, blue]}>{data?.following}</Text>
            </Pressable>
          )}
          <Text>Following</Text>
        </View>
      </View>
      {(data?.comment || data?.webSite) && (
        <View
          style={{
            alignSelf: 'flex-start',
            paddingHorizontal: 15,
            rowGap: 10,
          }}>
          <Text>{data?.comment}</Text>
          <Text
            style={{color: 'dodgerblue'}}
            onPress={() =>
              navigation.navigate(WebView.name, {uri: data?.webSite})
            }>
            {data?.webSite}
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserInfo;
