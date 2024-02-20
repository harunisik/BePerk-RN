import {View, Text, TouchableWithoutFeedback} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import {useStore} from '../../containers/StoreContainer';
import {FollowersActionType} from '../../containers/FollowersAction';

const UserItem = ({item}) => {
  const [selected, setSelected] = useState(false);
  const {dispatch} = useStore();

  const handlePress = () => {
    setSelected(!selected);
    dispatch({
      type: !selected
        ? FollowersActionType.ADD_USER
        : FollowersActionType.DELETE_USER,
      user: item,
    });
  };

  const {flex1, aiCenter, row, jcSpaceBetween, pt10, pb10, cGap10} = common;

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[row, flex1, jcSpaceBetween, aiCenter, pb10, pt10]}>
        <View style={[row, aiCenter, cGap10]}>
          <MaterialCommunityIcons name="account" size={26} />
          <Text>{item.fullname}</Text>
          {item.isVerified === 1 && (
            <MaterialIcons name="verified" size={16} color="blue" />
          )}
        </View>
        <MaterialCommunityIcons
          name={selected ? 'check-circle' : 'circle-outline'}
          color={selected ? 'blue' : 'gray'}
          size={22}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserItem;
