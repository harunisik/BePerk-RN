import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import ShareButton from '../common/buttons/ShareButton';

const DovesItemOptions = ({item}) => {
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
