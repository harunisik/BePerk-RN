import {useNavigation} from '@react-navigation/native';
import FeaturedItemDetails from './FeaturedItemDetails';
import {useGetFeaturedFeed} from '../../hooks/infiniteQueryHooks';
import PostItemList from '../../components/profile/PostItemList';
import {AddDoveModal} from '../add/AddModal';
import common from '../../styles/sharedStyles';
import {useState} from 'react';
import View from '../../components/common/View';
import {PlusIcon} from '../../components/common/Icons';

const {row, cGap15} = common;

const HeaderRight = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[row, cGap15]}>
      <PlusIcon
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <AddDoveModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

export const FeaturedScreenOptions = () => {
  return {
    headerRight: HeaderRight,
  };
};

const Featured = () => {
  const navigation = useNavigation();

  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetFeaturedFeed();

  const handlePressItem = index => {
    navigation.navigate(FeaturedItemDetails.name, {index});
  };

  return (
    <PostItemList
      data={data}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
      onPressItem={handlePressItem}
    />
  );
};

export default Featured;
