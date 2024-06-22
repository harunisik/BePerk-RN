import {useNavigation} from '@react-navigation/native';
import FeaturedItemDetails from './FeaturedItemDetails';
import {useGetFeaturedFeed} from '../../hooks/infiniteQueryHooks';
import {AddDoveModal} from '../add/AddModal';
import common from '../../styles/sharedStyles';
import {useState} from 'react';
import View from '../../components/common/View';
import {PlusIcon} from '../../components/common/Icons';
import PostItemList from '../../components/profile/PostItemList';

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

  const {data, isFetching, fetchNextPage, refetch, remove} =
    useGetFeaturedFeed();

  const handlePressItem = index => {
    navigation.navigate(FeaturedItemDetails.name, {index});
  };

  return (
    <View style={{flex: 1}}>
      <PostItemList
        data={data}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        refetch={refetch}
        remove={remove}
        onPressItem={handlePressItem}
      />
    </View>
  );
};

export default Featured;
