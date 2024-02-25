import {View, Text, TouchableWithoutFeedback} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';

const UserItem = ({item, onPress, selectable = false}) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected(!selected);
    onPress(item, !selected);
  };

  const {aiCenter, row, jcSpaceBetween, cGap10} = common;

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[row, jcSpaceBetween, aiCenter]}>
        <View style={[row, aiCenter, cGap10]}>
          <MaterialIcons name="account-circle" size={36} color="lightgray" />
          <Text>{item.fullname}</Text>
          {item.isVerified === 1 && (
            <MaterialIcons name="verified" size={16} color="dodgerblue" />
          )}
        </View>
        {selectable && (
          <MaterialCommunityIcons
            name={selected ? 'check-circle' : 'circle-outline'}
            color={selected ? 'dodgerblue' : 'gray'}
            size={22}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserItem;
