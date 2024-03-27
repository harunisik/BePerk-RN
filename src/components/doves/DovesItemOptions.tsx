import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import Followers from '../../views/profile/Followers';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import {useNavigation} from '@react-navigation/native';
import ShareButton from '../common/buttons/ShareButton';

const DovesItemOptions = ({item}) => {
  const navigation = useNavigation();
  const {aiCenter, row, cGap15} = common;

  return (
    <View style={[cGap15, row, aiCenter]}>
      <LikeButtton item={item} type={item.type} />
      <CommentButton item={item} />
      <ShareButton item={item} />
    </View>
  );
};

export default DovesItemOptions;
