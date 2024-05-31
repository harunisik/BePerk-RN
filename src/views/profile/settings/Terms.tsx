import {useNavigation} from '@react-navigation/native';
import WebView from '../../../components/common/WebView';
import {SettingsListItem1} from './Settings';

const pageTitle = 'Terms';

export const TermsListItem = () => {
  const navigation = useNavigation();

  return (
    <SettingsListItem1
      onPress={() =>
        navigation.navigate(WebView.name, {
          uri: 'https://beperk.life/terms.html',
          pageTitle,
        })
      }
      title={pageTitle}
    />
  );
};

export default TermsListItem;
