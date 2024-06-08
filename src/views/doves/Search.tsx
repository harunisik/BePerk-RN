import {useWindowDimensions} from 'react-native';
import common from '../../styles/sharedStyles';
import {useState} from 'react';
import SearchProfilesTab from './SearchProfilesTab';
import {TabBar, TabView} from 'react-native-tab-view';
import SearchTagsTab from './SearchTagsTab';
import Text from '../../components/common/Text';
import View from '../../components/common/View';
import TextInput from '../../components/common/TextInput';
import {useColors} from '../../hooks/customHooks';

const {p15, flex1} = common;

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

const renderTabBar = props => {
  const {color, backgroundColor} = useColors();

  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: color}}
      style={{marginBottom: 20, backgroundColor}}
      renderLabel={({route}) => <Text>{route.title}</Text>}
    />
  );
};

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
  const {theme2} = useColors();

  return (
    <View style={[p15, flex1, {rowGap: 5}]}>
      <TextInput
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        style={{
          borderRadius: 20,
          paddingHorizontal: 15,
        }}
        theme={theme2}
      />

      <SearchTabGroup searchText={searchText} />
    </View>
  );
};

export default Search;
