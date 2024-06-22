import DovesItem from '../../components/doves/DovesItem';
import PostDove from './PostDove';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback} from 'react';
import {useGetUserExploring} from '../../hooks/infiniteQueryHooks';
import InfiniteFlatList from '../../components/common/InfiniteFlatList';
import View from '../../components/common/View';
import HR from '../../components/common/HR';
import {FileIcon} from '../../components/common/Icons';
import Button from '../../components/common/buttons/Button';
import {Loader} from './HomeTab';

const ListHeaderComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {subtype, buttonText, inputTextPlaceHolder, title},
  } = route;

  return (
    <View style={{rowGap: 20, paddingVertical: 20}}>
      <Button
        title={buttonText}
        onPress={() =>
          navigation.navigate(PostDove.name, {
            subtype,
            inputTextPlaceHolder,
            title,
          })
        }
        icon={<FileIcon size={22} />}
        style={{alignSelf: 'center'}}
      />
      <HR />
    </View>
  );
};

const DoveTab = () => {
  const route = useRoute();
  const {
    params: {subtype},
  } = route;

  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetUserExploring(2, subtype, 35);

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator lineVisible size="large" />,
    [],
  );

  return (
    <View style={{flex: 1}}>
      <InfiniteFlatList
        data={data}
        renderItem={({item}) => <DovesItem item={item} />}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        refetch={refetch}
        remove={remove}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={<Loader />}
      />
    </View>
  );
};

export default DoveTab;
