import Text from '../../components/common/Text';
import View from '../../components/common/View';
import {CameraIcon, CloseIcon} from '../../components/common/Icons';
import Button from '../../components/common/buttons/Button';

export const NewMediaScreenOptions = ({navigation}) => {
  return {
    title: '',
    headerLeft: () => <CloseIcon onPress={() => navigation.goBack()} />,
  };
};

const NewMedia = () => {
  return (
    <View style={{flex: 1}}>
      <CameraIcon />
      <Text>
        Let BePerk access Photos to add recent photos and videos to your post
      </Text>
      <Button title="Enable photo access" />
    </View>
  );
};

export default NewMedia;
