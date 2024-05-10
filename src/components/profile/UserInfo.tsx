import {View, Text, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import common from '../../styles/sharedStyles';
import Followers from '../../views/profile/Followers';
import {useNavigation} from '@react-navigation/native';

const {aiCenter, row, jcCenter, bold, blue, cGap50, p10} = common;

const UserInfo = ({data, isAuthUser}) => {
  const navigation = useNavigation();
  return (
    <View style={[aiCenter, jcCenter]}>
      <View style={[aiCenter, p10]}>
        <MaterialIcons name="account-circle" size={56} color="lightgray" />
        <Text style={bold}>{data?.fullname}</Text>
      </View>

      <View style={[aiCenter, row, jcCenter, cGap50, p10]}>
        <View style={[aiCenter]}>
          <Text style={[bold, blue]}>{data?.posts}</Text>
          <Text>Posts</Text>
        </View>
        <View style={[aiCenter]}>
          {!isAuthUser && data?.hide_followers === 1 ? (
            <Text style={[bold, blue]}>{data?.hide_followers_emoji}</Text>
          ) : (
            <Pressable onPress={() => navigation.navigate(Followers.name)}>
              <Text style={[bold, blue]}>{data?.followers}</Text>
            </Pressable>
          )}
          <Text>Followers</Text>
        </View>
        <View style={[aiCenter]}>
          {!isAuthUser && data?.hide_followers === 1 ? (
            <Text style={[bold, blue]}>{data?.hide_following_emoji}</Text>
          ) : (
            <Pressable onPress={() => navigation.navigate(Followers.name)}>
              <Text style={[bold, blue]}>{data?.following}</Text>
            </Pressable>
          )}
          <Text>Following</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
