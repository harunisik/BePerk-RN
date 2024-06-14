import {StyleSheet, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import UserSearch, {ChatShareHeaderRight} from '../../views/profile/UserSearch';
import {useNavigation} from '@react-navigation/native';
import {CopyIcon, ShareIcon} from '../common/Icons';
import Button from '../common/buttons/Button';
import BottomSheetModal from '../common/BottomSheetModal';
import {colors, useColors} from '../../hooks/customHooks';
import View from '../common/View';

const UserProfileModal = ({userId, visible, onDismiss}) => {
  const navigation = useNavigation();
  const {theme, color} = useColors();

  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={onDismiss}
      snapPoints={['34%']}>
      <View style={{rowGap: 10, width: '85%'}} disableTheme>
        <Button
          title="Copy Link"
          onPress={() => {
            onDismiss();
            showMessage({message: 'Link copied'});
            Clipboard.setString(`beperk://profile?id=${userId}`);
          }}
          icon={<CopyIcon color={colors.blue} />}
          iconColor={colors.blue}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />
        <Button
          title="Share This Profile"
          onPress={() => {
            onDismiss();
            navigation.navigate(UserSearch.name, {
              presentation: 'none',
              headerRightComp: ChatShareHeaderRight.name,
              headerRightProps: {itemId: userId, type: 6},
            });
          }}
          icon={<ShareIcon color={colors.blue} />}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />

        <Button
          title="Report"
          onPress={() => Alert.alert('under construction')}
          icon={
            <MaterialIcons name="report-gmailerrorred" size={26} color="red" />
          }
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />

        <Button
          title="Block"
          onPress={() => Alert.alert('under construction')}
          icon={<MaterialIcons name="block" size={26} color="red" />}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    paddingLeft: 70,
    margin: 10,
  },
});

export default UserProfileModal;
