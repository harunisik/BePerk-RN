import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import common from '../../styles/sharedStyles';

const UserInfo = ({data}) => {
  const {aiCenter, row, jcCenter, bold, blue, cGap50, p10} = common;

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
          <Text style={[bold, blue]}>{data?.followers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={[aiCenter]}>
          <Text style={[bold, blue]}>{data?.following}</Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
