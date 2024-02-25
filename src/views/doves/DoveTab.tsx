import {View, FlatList, TouchableOpacity, StyleSheet, Text} from 'react-native';
import common from '../../styles/sharedStyles';
import DovesItem from '../../components/doves/DovesItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetUserExploring} from '../../hooks/userHooks';
import PostDove from './PostDove';
import {useEffect} from 'react';

const ListHeaderComponent = ({navigation, route}) => {
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

const DoveTab = ({navigation, route}) => {
  const {flex1, jcCenter, aiCenter} = common;
  const {
    params: {subtype, doRefresh},
  } = route;

  const {data, refetch, isFetching} = useGetUserExploring({
    filter: 2,
    limit: 35,
    offset: 0,
    subtype,
  });

  useEffect(() => {
    if (doRefresh) {
      navigation.setParams({doRefresh: false});
      refetch();
    }
  }, [doRefresh]);

  return (
    <View style={[flex1, jcCenter, aiCenter]}>
      <FlatList
        data={data?.exploring}
        renderItem={({item}) => (
          <DovesItem
            item={item}
            navigation={navigation}
            onDeleteItem={refetch}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
        ListHeaderComponent={
          <ListHeaderComponent navigation={navigation} route={route} />
        }
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
