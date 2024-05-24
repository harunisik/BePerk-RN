import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import common from '../../styles/sharedStyles';
import ProfileStack from '../../views/profile/ProfileStack';
import CircleGradientBorder from './CircleGradientBorder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStore} from '../../containers/StoreContainer';
import Profile from '../../views/profile/Profile';

const {row, aiCenter, rGap5, bold} = common;

interface AccountCardProps {
  isAuthUser?: boolean;
  userId?: number;
  username?: string;
  photo?: string;
  size?: number;
  color?: string;
  labelColor?: string;
  vertical?: boolean;
  bordered?: boolean;
  displayUsername?: boolean;
  goBack?: boolean;
  disableNavigation?: boolean;
  usePush?: boolean;
}

const AccountCard = ({
  isAuthUser = false,
  userId,
  username,
  photo,
  size = 26,
  color = 'dodgerblue',
  labelColor = 'black',
  vertical = false,
  bordered = false,
  displayUsername = true,
  goBack = false,
  disableNavigation = false,
  usePush = false,
}: AccountCardProps) => {
  const navigation = useNavigation();

  const {
    store: {
      authResult: {
        id: authUserId,
        username: authUsername,
        photo: authUserPhoto,
      },
    },
  } = useStore();

  const _isAuthUser = isAuthUser || authUserId === userId;
  const _userId = _isAuthUser ? authUserId : userId;
  const _username = _isAuthUser ? authUsername : username;
  const _photo = _isAuthUser ? authUserPhoto : photo;

  const handlePress = () => {
    if (!disableNavigation && !_isAuthUser) {
      if (goBack) {
        navigation.goBack();
      }

      if (!usePush) {
        navigation.navigate(ProfileStack.name, {
          headerBackVisible: true,
          userId: _userId,
          username: _username,
        });
      } else {
        navigation.push(Profile.name, {
          headerBackVisible: true,
          userId: _userId,
          username: _username,
          isAuthUser: false,
        });
      }
    }
  };

  return (
    <Pressable
      style={[...(vertical ? [rGap5] : [row, aiCenter, {columnGap: 5}])]}
      onPress={handlePress}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <CircleGradientBorder disabled={!bordered}>
          {_photo ? (
            <Image
              source={{uri: _photo}}
              style={{
                width: size * 1.5,
                height: size * 1.5,
                borderRadius: (size * 1.5) / 2,
              }}
            />
          ) : (
            <MaterialCommunityIcons
              name="account"
              size={size}
              color={color}
              style={{padding: size / 4}}
            />
          )}
        </CircleGradientBorder>
      </View>
      <View style={{alignItems: 'center'}}>
        {displayUsername && _username && (
          <Text style={[bold, {color: labelColor}]} numberOfLines={1}>
            {_username}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default AccountCard;
