import {useNavigation} from '@react-navigation/native';
import WebView from '../../../components/common/WebView';
import {SettingsListItem1} from './Settings';

const pageTitle = 'Privacy policy';

export const PrivacyPolicyListItem = () => {
  const navigation = useNavigation();

  return (
    <SettingsListItem1
      onPress={() =>
        navigation.navigate(WebView.name, {
          uri: 'https://beperk.life/policy.html',
          pageTitle,
        })
      }
      title={pageTitle}
    />
  );
};

export default PrivacyPolicyListItem;
