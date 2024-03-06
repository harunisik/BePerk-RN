import {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import RNFastImage from 'react-native-fast-image';

const FastImage = ({uri}) => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [imageWidth, setImageWidth] = useState(windowWidth);
  const [imageHeight, setImageHeight] = useState(windowHeight * 0.5);

  const handleLoad = ({nativeEvent: {width, height}}) => {
    setImageWidth(width);
    setImageHeight(height);
  };

  return (
    <RNFastImage
      onLoad={handleLoad}
      style={[
        {
          width: windowWidth,
          aspectRatio: imageWidth / imageHeight,
        },
      ]}
      source={{uri}}
      resizeMode={RNFastImage.resizeMode.contain}
    />
  );
};

export default FastImage;
