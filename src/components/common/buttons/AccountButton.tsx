import {useNavigation} from '@react-navigation/native';
import Followers from '../../../views/profile/Followers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Pressable, Text, View} from 'react-native';
import common from '../../../styles/sharedStyles';
import Profile from '../../../views/profile/Profile';

const {cGap3, row, aiCenter, rGap5, font14, bold} = common;

interface ShareButtonProps {
  item: any;
  size?: number;
  color?: string;
  vertical?: boolean;
}

const AccountButton = ({
  item,
  size = 26,
  color = 'dodgerblue',
  vertical = false,
}: ShareButtonProps) => {
  const navigation = useNavigation();

  const handlePress = () =>
    navigation.navigate(Profile.name, {
      userId: item.user_id,
      username: item.username,
    });

  return (
    <Pressable
      style={[...(vertical ? [rGap5] : [row, cGap3, aiCenter])]}
      onPress={handlePress}>
      <MaterialIcons name="account-circle" size={size} color={color} />
      <Text style={[bold, font14, {color}]}>{item.fullname}</Text>
    </Pressable>
  );
};

export default AccountButton;
