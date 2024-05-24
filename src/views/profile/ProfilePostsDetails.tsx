import {useRoute} from '@react-navigation/native';
import PostDetailItemList from '../../components/profile/PostDetailItemList';
import {useGetUserPhotoVideo} from '../../hooks/infiniteQueryHooks';

const ProfilePostsDetails = () => {
  const route = useRoute();
  const {
    params: {userId: id},
  } = route;

  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetUserPhotoVideo(id, 35);

  return (
    <PostDetailItemList
      data={data}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
    />
  );
};

export default ProfilePostsDetails;
