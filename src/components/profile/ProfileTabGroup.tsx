import {useWindowDimensions, Text} from 'react-native';
import {useState} from 'react';
import {TabBar, TabView} from 'react-native-tab-view';
import PostsTab from '../../views/profile/PostsTab';
import StoriesTab from '../../views/profile/StoriesTab';

const renderScene = ({route, userId}) => {
  switch (route.key) {
    case PostsTab.name:
      return <PostsTab userId={userId} />;
    case StoriesTab.name:
      return <StoriesTab />;
    default:
      return null;
  }
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'dodgerblue'}}
    style={{backgroundColor: 'white', marginBottom: 20}}
    renderLabel={({route}) => (
      <Text style={{color: 'dodgerblue'}}>{route.title}</Text>
    )}
  />
);

const ProfileTabGroup = ({userId}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: PostsTab.name, title: 'Posts'},
    {key: StoriesTab.name, title: 'Stories'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={({route}) => renderScene({route, userId})}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      lazy
    />
  );
};

export default ProfileTabGroup;
