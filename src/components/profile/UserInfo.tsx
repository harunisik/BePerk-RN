import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';

const UserInfo = ({data}) => {
  const {aiCenter, row, dashed, jcSpaceAround} = common;

  return (
    <View>
      <View style={[aiCenter, dashed]}>
        <MaterialCommunityIcons name="account" size={56} />
        <Text>{data?.fullname}</Text>
      </View>

      <View style={[aiCenter, row, dashed, jcSpaceAround]}>
        <View style={[aiCenter, dashed]}>
          <Text>{data?.posts}</Text>
          <Text>Posts</Text>
        </View>
        <View style={[aiCenter, dashed]}>
          <Text>{data?.followers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={[aiCenter, dashed]}>
          <Text>{data?.following}</Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
