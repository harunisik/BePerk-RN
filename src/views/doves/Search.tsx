import {TextInput, StyleSheet, useWindowDimensions} from 'react-native';
import common from '../../styles/sharedStyles';
import {useState} from 'react';
import SearchProfilesTab from './SearchProfilesTab';
import {TabBar, TabView} from 'react-native-tab-view';
import SearchTagsTab from './SearchTagsTab';
import Text from '../../components/common/Text';
import View from '../../components/common/View';

const renderScene = ({route, searchText}) => {
  switch (route.key) {
    case SearchProfilesTab.name:
      return <SearchProfilesTab searchText={searchText} />;
    case SearchTagsTab.name:
      return <SearchTagsTab searchText={searchText} />;
    default:
      return null;
  }
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'dodgerblue'}}
    style={{marginBottom: 20}}
    renderLabel={({route}) => (
      <Text style={{color: 'dodgerblue'}}>{route.title}</Text>
    )}
  />
);

const SearchTabGroup = ({searchText}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: SearchProfilesTab.name, title: 'Profiles'},
    {key: SearchTagsTab.name, title: 'Tags'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={({route}) => renderScene({route, searchText})}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      lazy
    />
  );
};

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const {pl15, pr15, flex1} = common;

  return (
    <View style={[pl15, pr15, flex1]}>
      <TextInput
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        style={styles.textInput}
      />

      <SearchTabGroup searchText={searchText} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Search;
