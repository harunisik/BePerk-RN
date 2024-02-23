import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import common from '../../styles/sharedStyles';
import PostDove from '../../views/doves/PostDove';
import DoveTab from '../../views/doves/DoveTab';
import {useStore} from '../../containers/StoreContainer';
import {ModalActionType} from '../../containers/ModalAction';

const AddDoveModal = ({navigation}) => {
  const {dispatch} = useStore();
  const {aiCenter, cGap15, row} = common;

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, aiCenter, row, cGap15]}
        onPress={() => {
          dispatch({type: ModalActionType.CLOSE});
          navigation.navigate(PostDove.name, {
            subtype: 0,
            doRefresh: false,
            buttonText: "Post what's on your mind",
            inputTextPlaceHolder: "What's on your mind?",
            title: 'Post Dove',
            navigateTo: DoveTab.name,
          });
        }}>
        <AntDesign name="picture" size={26} color="blue" />
        <Text>Discussion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, aiCenter, row, cGap15]}
        onPress={() => {
          dispatch({type: ModalActionType.CLOSE});
          navigation.navigate(PostDove.name, {
            subtype: 1,
            doRefresh: false,
            buttonText: 'Write what God has done for you!',
            inputTextPlaceHolder: 'Share a testimony',
            title: 'Post Testimony',
            navigateTo: 'TestimonyTab',
          });
        }}>
        <MaterialCommunityIcons
          name="account-multiple"
          size={26}
          color="orange"
        />
        <Text>Testimony</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, aiCenter, row, cGap15]}
        onPress={() => {
          dispatch({type: ModalActionType.CLOSE});
          navigation.navigate(PostDove.name, {
            subtype: 2,
            doRefresh: false,
            buttonText: 'Share a prayer request!',
            inputTextPlaceHolder: 'Share a prayer request',
            title: 'Post Prayer Request',
            navigateTo: 'PrayerTab',
          });
        }}>
        <MaterialIcons name="work" size={26} color="purple" />
        <Text>Prayer Request</Text>
      </TouchableOpacity>
    </View>
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

export default AddDoveModal;
