import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import Followers from '../../views/profile/Followers';
import UserLike from '../common/UserLike';
import UserComment from '../common/UserComment';
import {useNavigation} from '@react-navigation/native';

const DovesItemOptions = ({item}) => {
  const navigation = useNavigation();
  const {aiCenter, row, cGap15} = common;

  return (
    <View style={[cGap15, row, aiCenter]}>
      <UserLike item={item} type={item.type} />
      <UserComment item={item} />
      <MaterialCommunityIcons
        name="share-outline"
        size={22}
        color="gray"
        onPress={() =>
          navigation.navigate(Followers.name, {id: item.id, type: item.type})
        }
      />
    </View>
  );
};

export default DovesItemOptions;
