import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconProps as IconPropsRN} from 'react-native-vector-icons/Icon';
import {useColors} from '../../hooks/customHooks';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type IconProps = Optional<IconPropsRN, 'name'>;

// MaterialCommunityIcons

export const ShareIcon = ({size = 26, disabled, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons
      name="share"
      size={size}
      color={disabled ? 'gray' : _color}
      disabled={disabled}
      {...rest}
    />
  );
};

export const AccountIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons
      name="account"
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const CloseIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons name="close" size={size} color={_color} {...rest} />
  );
};

export const BookmarkIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons
      name="bookmark"
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const HeartIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons name="heart" size={size} color={_color} {...rest} />
  );
};

export const CommentIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons
      name="comment-processing-outline"
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const DotsIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons
      name="dots-horizontal"
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const PlusIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons
      name="plus-circle"
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const BellIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons name="bell" size={size} color={_color} {...rest} />
  );
};

export const FileIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons
      name="file-document-edit-outline"
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const ShareVariantIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons
      name="share-variant"
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const CogIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialCommunityIcons name="cog" size={size} color={_color} {...rest} />
  );
};

// AntDesign

export const PictureIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return <AntDesign name="picture" size={size} color={_color} {...rest} />;
};

export const CameraIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return <AntDesign name="camera" size={size} color={_color} {...rest} />;
};

// MaterialIcons

export const PlayIcon = ({size = 26, ...rest}: IconProps) => {
  // const _color = color ?? useColors().color;

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
  const _color = color ?? useColors().color;

  return (
    <MaterialIcons
      name="arrow-forward-ios"
      size={size}
      color={_color}
      {...rest}
    />
  );
};

export const VerifiedIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return <MaterialIcons name="verified" size={size} color={_color} {...rest} />;
};

export const VideoIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialIcons name="ondemand-video" size={size} color={_color} {...rest} />
  );
};

export const LocationIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return (
    <MaterialIcons name="location-pin" size={size} color={_color} {...rest} />
  );
};

export const SearchIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return <MaterialIcons name="search" size={size} color={_color} {...rest} />;
};

// Ionicons

export const TimerIcon = ({size = 26, color, ...rest}: IconProps) => {
  const _color = color ?? useColors().color;

  return <Ionicons name="timer" size={size} color={_color} {...rest} />;
};
