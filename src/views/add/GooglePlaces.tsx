import {Text} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewPost from './NewPost';
import {useNavigation} from '@react-navigation/native';
import {useRef} from 'react';

export const GooglePlacesScreenOptions = ({navigation}) => {
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

const GooglePlaces = () => {
  const navigation = useNavigation();
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Search"
      onPress={(
        {description},
        {
          geometry: {
            location: {lat, lng},
          },
        },
      ) => {
        navigation.navigate({
          name: NewPost.name,
          params: {
            location_address: description,
            lat,
            lon: lng,
          },
          merge: true,
        });
      }}
      // currentLocation
      query={{
        key: process.env.GOOGLE_API_KEY,
        language: 'en',
      }}
      onFail={_error => {
        showMessage({message: 'Error occured'});
      }}
      fetchDetails
      isRowScrollable={false}
      GooglePlacesDetailsQuery={{fields: 'geometry'}}
      styles={{row: {alignItems: 'center', columnGap: 10}}}
      renderRow={({description}) => {
        return (
          <>
            <MaterialCommunityIcons
              name="map-marker"
              size={26}
              color="dodgerblue"
            />
            <Text style={{flex: 1}} numberOfLines={1}>
              {description}
            </Text>
          </>
        );
      }}
    />
  );
};

export default GooglePlaces;
