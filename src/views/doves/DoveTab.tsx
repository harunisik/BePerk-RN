import {FlatList, TouchableOpacity, StyleSheet, Text} from 'react-native';
import common from '../../styles/sharedStyles';
import DovesItem from '../../components/doves/DovesItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostDove from './PostDove';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getUserExploring} from '../../services/UserService';

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
  const route = useRoute();
  const {
    params: {subtype},
  } = route;

  const {data, refetch, isRefetching} = useQuery(
    getUserExploring,
    {filter: 2, limit: 35, offset: 0, subtype},
    route.key,
  );

  return (
    <FlatList
      data={data?.exploring}
      renderItem={({item}) => <DovesItem item={item} />}
      keyExtractor={item => item.id}
      onRefresh={refetch}
      refreshing={isRefetching}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={<ItemSeperator lineVisible large />}
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
