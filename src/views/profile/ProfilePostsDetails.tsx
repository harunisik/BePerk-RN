import {useRoute} from '@react-navigation/native';
import PostDetailItemList from '../../components/profile/PostDetailItemList';
import {useGetUserPhotoVideo} from '../../hooks/infiniteQueryHooks';

const ProfilePostsDetails = () => {
  const route = useRoute();
  const {
    params: {userId, index},
  } = route;

  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetUserPhotoVideo(userId, 35);

  return (
    <PostDetailItemList
      data={data}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
      initialScrollIndex={index}
    />
  );
};

export default ProfilePostsDetails;
