import {Platform} from 'react-native';
import * as imagePicker from 'react-native-image-picker';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

export function launchImageLibrary(callback: any, options = undefined) {
  imagePicker.launchImageLibrary(
    {
      mediaType: 'mixed',
      presentationStyle: 'fullScreen',
      ...(options ? options : {}),
    },
    callback,
  );
}

export function launchCamera(callback: any, options = undefined) {
  imagePicker.launchCamera(
    {
      mediaType: 'mixed',
      presentationStyle: 'fullScreen',
      durationLimit: 30,
      ...(options ? options : {}),
    },
    callback,
  );
}

export function launchMediaLibrary(callback: any, type: string) {
  if (Platform.OS === 'ios') {
    const permission =
      type === 'camera'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.IOS.PHOTO_LIBRARY;

    _launchMediaLibraryIOS(permission, callback);
  } else {
    // PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    // PERMISSIONS.ANDROID.RECORD_AUIDO,
    const permission =
      type === 'camera'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

    _launchMediaLibraryAndroid(permission, callback);
  }
}

function _launchMediaLibraryIOS(permission: Permission, callback: any) {
  check(permission)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );

          request(permission).then(result => {
            switch (result) {
              case RESULTS.GRANTED:
                console.log('The permission is granted');
                callback();
                break;
              case RESULTS.BLOCKED:
                console.log(
                  'The permission is denied and not requestable anymore',
                );
                break;
            }
          });
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          callback();
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          callback();
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function _launchMediaLibraryAndroid(permission: Permission, callback: any) {
  check(permission)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );

          request(permission).then(result => {
            switch (result) {
              case RESULTS.DENIED:
                console.log(
                  'The permission has not been requested / is denied but requestable',
                );
                break;
              case RESULTS.BLOCKED:
                console.log(
                  'The permission is denied and not requestable anymore',
                );
                break;
              case RESULTS.GRANTED:
                console.log('The permission is granted');
                callback();
                break;
            }
          });
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          callback();
          break;
      }
    })
    .catch(error => {
      console.error(error);
    });
}
