import {View, FlatList, TouchableOpacity, StyleSheet, Text} from 'react-native';
import common from '../../styles/sharedStyles';
import DovesItem from '../../components/doves/DovesItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetUserExploring} from '../../hooks/userHooks';
import PostDove from './PostDove';
import {useEffect} from 'react';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useNavigation, useRoute} from '@react-navigation/native';

const ListHeaderComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {row, jcCenter, aiCenter, cGap10} = common;
  const {
    params: {subtype, buttonText, inputTextPlaceHolder, title, navigateTo},
  } = route;

  return (
    <TouchableOpacity
      style={[styles.button, aiCenter, jcCenter, row, cGap10]}
      onPress={() =>
        navigation.navigate(PostDove.name, {
          subtype,
          inputTextPlaceHolder,
          title,
          navigateTo,
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
  const navigation = useNavigation();
  const route = useRoute();
  const {flex1, jcCenter, aiCenter} = common;
  const {
    params: {subtype},
  } = route;

  const {data, refetch, isFetching} = useGetUserExploring({
    filter: 2,
    limit: 35,
    offset: 0,
    subtype,
  });

  return (
    <View style={[flex1, jcCenter, aiCenter]}>
      <FlatList
        data={data?.exploring}
        renderItem={({item}) => (
          <DovesItem item={item} onDeleteItem={refetch} />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={<ItemSeperator lineVisible large />}
      />
    </View>
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
