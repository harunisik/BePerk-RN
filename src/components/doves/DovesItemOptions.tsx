import common from '../../styles/sharedStyles';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import ShareButton from '../common/buttons/ShareButton';
import View from '../common/View';

const {aiCenter, row} = common;

interface DovesItemOptionsProps {
  item: any;
  color?: string;
  backgroundColor?: string;
  iconSize?: number;
  labelSize?: number;
}

const DovesItemOptions = ({
  item,
  color,
  backgroundColor,
  iconSize,
  labelSize,
}: DovesItemOptionsProps) => {
  return (
    <View
      style={[
        row,
        aiCenter,
        backgroundColor && {backgroundColor},
        {columnGap: 12},
      ]}>
      <LikeButtton
        id={item.id}
        liked={item.liked}
        likesCount={item.likes_count}
        type={item.type}
        color={color}
        backgroundColor={backgroundColor}
        iconSize={iconSize}
        labelSize={labelSize}
      />
      <CommentButton
        id={item.id}
        fullname={item.fullname}
        username={item.username}
        userId={item.user_id}
        caption={item.caption}
        type={item.type}
        commentsCount={item.comments_count}
        uploadTime={item.upload_time}
        color={color}
        backgroundColor={backgroundColor}
        iconSize={iconSize}
        labelSize={labelSize}
      />
      <ShareButton
        id={item.id}
        type={item.type}
        color={color}
        iconSize={iconSize}
      />
    </View>
  );
};

export default DovesItemOptions;
