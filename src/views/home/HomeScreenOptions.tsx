import {Alert, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import common from '../../styles/sharedStyles';
import Search from '../doves/Search';
import {useNavigation} from '@react-navigation/native';
import Activity from '../doves/Activity';

const {row, cGap15} = common;

const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <View style={[row, cGap15]}>
      <MaterialCommunityIcons
        name="bell"
        onPress={() => navigation.navigate(Activity.name)}
        size={22}
        color="dodgerblue"
      />
      <FontAwesome6
        name="envelope"
        onPress={() => Alert.alert('Under construction!')}
        size={22}
        color="dodgerblue"
      />
    </View>
  );
};

const HomeScreenOptions = ({navigation}) => {
  // const navigation = useNavigation();

  return {
    title: '',
    headerLeft: () => (
      <MaterialIcons
        name="search"
        onPress={() => navigation.navigate(Search.name)}
        size={26}
      />
    ),
    headerRight: HeaderRight,
  };
};

export default HomeScreenOptions;
