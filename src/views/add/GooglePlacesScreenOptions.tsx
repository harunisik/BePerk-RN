import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GooglePlacesScreenOptions = ({navigation}) => {
  return {
    title: 'Places',
    animation: 'slide_from_bottom',
    presentation: 'fullScreenModal',
    headerLeft: () => (
      <MaterialCommunityIcons
        name="close"
        onPress={() => navigation.goBack()}
        size={26}
      />
    ),
  };
};

export default GooglePlacesScreenOptions;
