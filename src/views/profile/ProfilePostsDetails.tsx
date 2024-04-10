import {useRoute} from '@react-navigation/native';
import PostDetailItemList from '../../components/profile/PostDetailItemList';
import {useGetUserPhotoVideo} from '../../hooks/infiniteQueryHooks';

const ProfilePostsDetails = () => {
  const route = useRoute();
  const {
    params: {userId: id},
  } = route;

  const {data, fetchNextPage, isFetching, refetch, remove, hasNextPage} =
    useGetUserPhotoVideo(id, 35);

  return (
    <PostDetailItemList
      data={data}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
      hasNextPage={hasNextPage}
    />
  );
};

export default ProfilePostsDetails;
