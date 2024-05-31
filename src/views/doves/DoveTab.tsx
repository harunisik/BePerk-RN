import {TouchableOpacity, StyleSheet, Pressable} from 'react-native';
import common from '../../styles/sharedStyles';
import DovesItem from '../../components/doves/DovesItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostDove from './PostDove';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback} from 'react';
import {useGetUserExploring} from '../../hooks/infiniteQueryHooks';
import InfiniteFlatList from '../../components/common/InfiniteFlatList';
import Text from '../../components/common/Text';
import View from '../../components/common/View';
import HR from '../../components/common/HR';

const ListHeaderComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {row, jcCenter, aiCenter, cGap10} = common;
  const {
    params: {subtype, buttonText, inputTextPlaceHolder, title},
  } = route;

  return (
    <View style={{padding: 10}}>
      <Pressable
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
      </Pressable>
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
    () => <ItemSeperator lineVisible large />,
    [],
  );

  return (
    <InfiniteFlatList
      data={data}
      renderItem={({item}) => <DovesItem item={item} />}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 20,
  },
});

export default DoveTab;
