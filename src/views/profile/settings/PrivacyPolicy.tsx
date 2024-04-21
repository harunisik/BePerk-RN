import {Text, Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {flex1, row, aiCenter, jcSpaceBetween} = common;

const pageTitle = 'Privacy policy';

export const PrivacyPolicyScreenOptions = ({navigation}) => {
  return {
    title: pageTitle,
    animation: 'slide_from_bottom',
    presentation: 'fullScreenModal',
    headerLeft: () => (
      <MaterialCommunityIcons
        name="close"
        onPress={() => navigation.goBack()}
        size={26}
        color="dodgerblue"
      />
    ),
  };
};

export const PrivacyPolicyListItem = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(PrivacyPolicy.name)}
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{pageTitle}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
  );
};

const PrivacyPolicy = () => {
  return (
    <WebView source={{uri: 'https://beperk.life/policy.html'}} style={flex1} />
  );
};

export default PrivacyPolicy;
