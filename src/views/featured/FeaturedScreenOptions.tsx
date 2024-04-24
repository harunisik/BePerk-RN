import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import {useState} from 'react';
import {AddDoveModal} from '../add/AddModal';

const {row, cGap15} = common;

const HeaderRight = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[row, cGap15]}>
      <MaterialCommunityIcons
        name="plus-circle"
        size={26}
        color="dodgerblue"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <AddDoveModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

const FeaturedScreenOptions = ({navigation}) => {
  return {
    headerRight: HeaderRight,
  };
};

export default FeaturedScreenOptions;
