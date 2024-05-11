import {Text, Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WebView from '../../../components/common/WebView';

const {row, aiCenter, jcSpaceBetween} = common;

const pageTitle = 'Terms';

const TermsListItem = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(WebView.name, {
          uri: 'https://beperk.life/terms.html',
          pageTitle,
        })
      }
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{pageTitle}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
  );
};

export default TermsListItem;
