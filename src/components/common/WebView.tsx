import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView as RNWebView} from 'react-native-webview';
import common from '../../styles/sharedStyles';
import {CloseIcon} from './Icons';

const {flex1} = common;

const defaultTitle = 'Web View';

export const WebViewScreenOptions = ({navigation}) => {
  return {
    title: defaultTitle,
    animation: 'slide_from_bottom',
    presentation: 'fullScreenModal',
    headerLeft: () => <CloseIcon onPress={() => navigation.goBack()} />,
  };
};

const WebView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {uri, pageTitle},
  } = route;

  return (
    <RNWebView
      source={{uri}}
      style={flex1}
      onLoad={({nativeEvent: {title}}) =>
        navigation.setOptions({title: pageTitle ?? title ?? defaultTitle})
      }
    />
  );
};

export default WebView;
