import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

export const MediaViewScreenOptions = ({navigation}) => {
  return {
    title: '',
    animation: 'fade',
    presentation: 'fullScreenModal',
    headerTransparent: true,
    headerLeft: () => (
      <MaterialIcons
        name="close"
        color="dodgerblue"
        size={26}
        onPress={() => navigation.goBack()}
      />
    ),
  };
};

const MediaView = () => {
  const route = useRoute();
  const {
    params: {type, uri},
  } = route;

  return (
    <View>
      {type === 'image' ? (
        <FastImage source={{uri}} style={{width: '100%', height: '100%'}} />
      ) : (
        <View
          style={{
            width: '100%',
            // height: windowHeight * 0.6,
          }}>
          {/* <Video uri={item.filename} paused={!isViewable} /> */}
        </View>
      )}
    </View>
  );
};

export default MediaView;
