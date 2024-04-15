import {Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';

const {flex1, row, aiCenter, bold, cGap5} = common;

const MessageDetailsScreenOptions = ({navigation, route}) => {
  const {
    params: {title, isMultiple},
  } = route;

  return {
    title: '',
    headerLeft: () => (
      <View style={[row, aiCenter]}>
        <MaterialIcons
          name="arrow-back-ios"
          color="dodgerblue"
          size={26}
          onPress={() => navigation.goBack()}
        />

        <View style={[flex1, row, aiCenter, cGap5]}>
          <MaterialCommunityIcons
            name={isMultiple ? 'account-multiple' : 'account-circle'}
            size={26}
            color="lightgray"
          />
          <Text style={[bold, {width: '70%'}]} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    ),
  };
};

export default MessageDetailsScreenOptions;
