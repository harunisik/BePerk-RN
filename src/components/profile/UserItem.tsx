import {View, Text, TouchableWithoutFeedback} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';

const UserItem = ({item, onPress}) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected(!selected);
    onPress(item, !selected);
  };

  const {flex1, aiCenter, row, jcSpaceBetween, pt10, pb10, cGap10} = common;

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[row, flex1, jcSpaceBetween, aiCenter, pb10, pt10]}>
        <View style={[row, aiCenter, cGap10]}>
          <MaterialIcons name="account-circle" size={26} color="lightgray" />
          <Text>{item.fullname}</Text>
          {item.isVerified === 1 && (
            <MaterialIcons name="verified" size={16} color="dodgerblue" />
          )}
        </View>
        <MaterialCommunityIcons
          name={selected ? 'check-circle' : 'circle-outline'}
          color={selected ? 'dodgerblue' : 'gray'}
          size={22}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserItem;
