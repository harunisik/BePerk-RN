import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {IconProps as IconPropsRN} from 'react-native-vector-icons/Icon';
import {colors, useColors} from '../../hooks/customHooks';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type IconProps = Optional<IconPropsRN, 'name'> & {isOutlined?: boolean};

// MaterialCommunityIcons

export const ShareIcon = ({size = 26, disabled, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="share"
      size={size}
      color={disabled ? 'gray' : color ?? themeColor}
      disabled={disabled}
      {...rest}
    />
  );
};

export const AccountIcon = ({size = 26, style, ...rest}: IconProps) => {
  const {color, theme1, theme2} = useColors();

  return (
    <MaterialCommunityIcons
      name="account"
      size={size}
      color={theme2.color}
      style={[
        // {backgroundColor: theme2.backgroundColor, borderRadius: 20},
        style,
      ]}
      {...rest}
    />
  );
};

export const CloseIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="close"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const BookmarkIcon = ({
  size = 26,
  color,
  isOutlined = false,
  ...rest
}: IconProps) => {
  const {color: themeColor} = useColors();
  let _color = color ?? themeColor;

  if (!color && !isOutlined) {
    _color = '#0AAEEF';
  }

  return (
    <MaterialCommunityIcons
      name={isOutlined ? 'bookmark-outline' : 'bookmark'}
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const HeartIcon = ({
  size = 26,
  color,
  isOutlined = false,
  ...rest
}: IconProps) => {
  const {color: themeColor} = useColors();
  let _color = color ?? themeColor;

  if (!color && !isOutlined) {
    _color = '#0AAEEF';
  }

  return (
    <MaterialCommunityIcons
      name={isOutlined ? 'heart-outline' : 'heart'}
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const CommentIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="comment-outline"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const DotsIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="dots-horizontal"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const PlusIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="plus-circle"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const BellIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="bell"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const FileIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="file-document-edit-outline"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const ShareVariantIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="share-variant"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const CogIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="cog"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const HomeIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="home"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const BirdIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="bird"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const CopyIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="content-copy"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const DeleteIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialCommunityIcons
      name="delete"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

// AntDesign

export const PictureIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <AntDesign
      name="picture"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const CameraIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <AntDesign
      name="camera"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

// MaterialIcons

export const PlayIcon = ({size = 26, ...rest}: IconProps) => {
  return (
    <MaterialIcons
      name="play-arrow"
      size={size}
      color="rgba(255, 255, 255, 0.6)"
      {...rest}
    />
  );
};

export const ArrowIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialIcons
      name="arrow-forward-ios"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const VerifiedIcon = ({size = 16, color, ...rest}: IconProps) => {
  // const {color: themeColor} = useColors();

  return (
    <MaterialIcons name="verified" size={size} color={colors.blue} {...rest} />
  );
};

export const VideoIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialIcons
      name="ondemand-video"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const LocationIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialIcons
      name="location-pin"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const ArrowBackIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialIcons
      name="arrow-back-ios"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

export const SearchIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <MaterialIcons
      name="search"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

// Ionicons

export const TimerIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <Ionicons name="timer" size={size} color={color ?? themeColor} {...rest} />
  );
};

export const EarthIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <Ionicons name="earth" size={size} color={color ?? themeColor} {...rest} />
  );
};

// FontAwesome

export const CommentIcon2 = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <Fontisto
      name="comment"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};

// FontAwesome6

export const EnvelopeIcon = ({size = 26, color, ...rest}: IconProps) => {
  const {color: themeColor} = useColors();

  return (
    <FontAwesome6
      name="envelope"
      size={size}
      color={color ?? themeColor}
      {...rest}
    />
  );
};
