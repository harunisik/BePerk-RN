import {Pressable, TextStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import common from '../../styles/sharedStyles';
import ProfileStack from '../../views/profile/ProfileStack';
import CircleGradientBorder from './CircleGradientBorder';
import {useStore} from '../../containers/StoreContainer';
import Profile from '../../views/profile/Profile';
import FastImage from 'react-native-fast-image';
import Text from './Text';
import View from './View';
import {AccountIcon, VerifiedIcon} from './Icons';

const {row, aiCenter, rGap10, bold} = common;

interface AccountCardProps {
  isAuthUser?: boolean;
  userId?: number;
  username?: string;
  photo?: string;
  size?: number;
  color?: string;
  vertical?: boolean;
  bordered?: boolean;
  displayUsername?: boolean;
  goBack?: boolean;
  disableNavigation?: boolean;
  usePush?: boolean;
  center?: boolean;
  labelStyle?: TextStyle;
  isVerified?: boolean;
  subtitle?: string;
}

const AccountCard = ({
  isAuthUser = false,
  userId,
  username,
  photo,
  size = 26,
  vertical = false,
  bordered = false,
  displayUsername = true,
  goBack = false,
  disableNavigation = false,
  usePush = false,
  center = true,
  labelStyle,
  isVerified = false,
  subtitle,
}: AccountCardProps) => {
  const navigation = useNavigation();

  const {
    store: {
      userInfo: {
        userId: authUserId,
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
      style={[...(vertical ? [rGap10] : [row, aiCenter, {columnGap: 10}])]}
      onPress={handlePress}>
      <View
        style={{
          alignItems: center ? 'center' : 'flex-start',
        }}
        disableTheme>
        <CircleGradientBorder disabled={!bordered}>
          {_photo ? (
            <FastImage
              source={{
                uri: _photo,
              }}
              style={{
                width: size * 1.5,
                height: size * 1.5,
                borderRadius: (size * 1.5) / 2,
              }}
            />
          ) : (
            <AccountIcon size={size} style={{padding: size / 4}} />
          )}
        </CircleGradientBorder>
      </View>
      <View style={{alignItems: 'center'}} disableTheme>
        {displayUsername && _username && (
          <View disableTheme style={{rowGap: 3}}>
            <View style={[row, {columnGap: 5}]} disableTheme>
              <Text style={[bold, labelStyle]} numberOfLines={1}>
                {_username}
              </Text>
              {isVerified && <VerifiedIcon />}
            </View>
            {subtitle && (
              <Text color="gray" size={15}>
                {subtitle}
              </Text>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default AccountCard;
