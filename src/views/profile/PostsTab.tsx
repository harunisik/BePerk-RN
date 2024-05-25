import {useNavigation} from '@react-navigation/native';
import PostItemList from '../../components/profile/PostItemList';
import {useGetUserPhotoVideo} from '../../hooks/infiniteQueryHooks';
import ProfilePostsDetails from './ProfilePostsDetails';

const PostsTab = ({userId, onRefresh}) => {
  const navigation = useNavigation();
  const {data, fetchNextPage, isFetching, refetch, remove, hasNextPage} =
    useGetUserPhotoVideo(userId, 35);

  const handlePressItem = index => {
    navigation.navigate(ProfilePostsDetails.name, {userId, index});
  };

  return (
    <PostItemList
      data={data}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={() => {
        onRefresh();
        refetch();
      }}
      remove={remove}
      onPressItem={handlePressItem}
      hasNextPage={hasNextPage}
      useTabView
    />
  );
};

export default PostsTab;
