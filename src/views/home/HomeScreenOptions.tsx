import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import common from '../../styles/sharedStyles';
import Search from '../doves/Search';
import {useNavigation} from '@react-navigation/native';
import Activity from '../doves/Activity';
import ForYouTab from './ForYouTab';
import FollowingTab from './FollowingTab';
import {useState} from 'react';

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

const HeaderTitleButton = ({isSelected, onPress, label}) => {
  return (
    <TouchableWithoutFeedback>
      <Text
        style={[
          styles.default,
          isSelected ? styles.selected : styles.nonSelected,
        ]}
        onPress={onPress}>
        {label}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const HeaderTitle = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([true, false]);

  const handlePress = index => {
    setSelected([index === 0, index === 1]);
  };

  return (
    <View style={row}>
      <HeaderTitleButton
        label="For You"
        isSelected={selected[0]}
        onPress={() => {
          handlePress(0);
          navigation.setOptions({headerTransparent: true});
          navigation.navigate(ForYouTab.name);
        }}
      />
      <HeaderTitleButton
        label="Following"
        isSelected={selected[1]}
        onPress={() => {
          handlePress(1);
          navigation.setOptions({headerTransparent: false});
          navigation.navigate(FollowingTab.name);
        }}
      />
    </View>
  );
};

const HomeScreenOptions = ({navigation}) => {
  return {
    headerTransparent: true,
    headerTitle: HeaderTitle,
    headerLeft: () => (
      <MaterialIcons
        name="search"
        onPress={() => navigation.navigate(Search.name)}
        size={26}
        color="dodgerblue"
      />
    ),
    headerRight: HeaderRight,
  };
};

const styles = StyleSheet.create({
  default: {
    color: 'dodgerblue',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 18,
  },
  selected: {
    backgroundColor: 'red',
  },
  nonSelected: {
    backgroundColor: 'transparent',
  },
});

export default HomeScreenOptions;
