import {FlatList, TouchableOpacity, StyleSheet, Text} from 'react-native';
import common from '../../styles/sharedStyles';
import DovesItem from '../../components/doves/DovesItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostDove from './PostDove';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getUserExploring} from '../../services/UserService';
import {useCallback} from 'react';
import {useGetUserExploring} from '../../hooks/infiniteQueryHooks';

const ListHeaderComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {row, jcCenter, aiCenter, cGap10} = common;
  const {
    params: {subtype, buttonText, inputTextPlaceHolder, title},
  } = route;

  return (
    <TouchableOpacity
      style={[styles.button, aiCenter, jcCenter, row, cGap10]}
      onPress={() =>
        navigation.navigate(PostDove.name, {
          subtype,
          inputTextPlaceHolder,
          title,
        })
      }>
      <MaterialCommunityIcons
        name="file-document-edit-outline"
        size={26}
        color="dodgerblue"
      />
      <Text>{buttonText}</Text>
    </TouchableOpacity>
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
    () => <ItemSeperator lineVisible large />,
    [],
  );

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <DovesItem item={item} />}
      keyExtractor={item => item.id}
      onRefresh={() => {
        remove();
        refetch();
      }}
      refreshing={isFetching}
      onEndReached={() => !isFetching && fetchNextPage()}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default DoveTab;
