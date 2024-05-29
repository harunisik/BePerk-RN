import {Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WebView from '../../../components/common/WebView';
import Text from '../../../components/common/Text';

const {row, aiCenter, jcSpaceBetween} = common;

const pageTitle = 'Privacy policy';

const PrivacyPolicyListItem = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(WebView.name, {
          uri: 'https://beperk.life/policy.html',
          pageTitle,
        })
      }
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{pageTitle}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
  );
};

export default PrivacyPolicyListItem;
