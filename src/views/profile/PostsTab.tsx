import {useNavigation, useRoute} from '@react-navigation/native';
import PostItemList from '../../components/profile/PostItemList';
import {useGetUserPhotoVideo} from '../../hooks/infiniteQueryHooks';
import ProfilePostsDetails from './ProfilePostsDetails';

const PostsTab = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {userId: id},
  } = route;

  const {data, fetchNextPage, isFetching, refetch, remove, hasNextPage} =
    useGetUserPhotoVideo(id, 35);

  const handlePressItem = (index, item) => {
    navigation.navigate(ProfilePostsDetails.name, {userId: id});
  };

  console.log('poststab');

  return (
    <PostItemList
      data={data}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
      onPressItem={handlePressItem}
      hasNextPage={hasNextPage}
    />
  );
};

export default PostsTab;
