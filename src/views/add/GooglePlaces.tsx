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

const GooglePlaces = () => {
  const navigation = useNavigation();
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  // Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
  //   ref.current?.setAddressText('Woking');
  //   ref.current?.focus();
  // });

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
        navigation.navigate(NewPost.name, {
          location_address: description,
          lat,
          lon: lng,
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
