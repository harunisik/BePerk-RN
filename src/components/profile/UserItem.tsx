import {View, TouchableWithoutFeedback} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import AccountCard from '../common/AccountCard';

const {aiCenter, row, jcSpaceBetween} = common;

const UserItem = ({
  item,
  onPress,
  selectable = false,
  disableNavigation = false,
}) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected(!selected);
    onPress(item, !selected);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[row, jcSpaceBetween, aiCenter]}>
        <AccountCard
          userId={item.id}
          username={item.fullname}
          photo={item.photo}
          disableNavigation={disableNavigation}
        />
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
