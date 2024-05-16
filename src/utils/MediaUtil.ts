import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export function launchMediaLibrary(permission, callback, options = undefined) {
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
            console.log(result);
          });
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          if (permission === PERMISSIONS.IOS.PHOTO_LIBRARY) {
            launchImageLibrary(
              {
                mediaType: 'mixed',
                presentationStyle: 'fullScreen',
                ...(options ? options : {}),
              },
              callback,
            );
          } else if (permission === PERMISSIONS.IOS.CAMERA) {
            launchCamera(
              {
                mediaType: 'mixed',
                presentationStyle: 'fullScreen',
                durationLimit: 30,
                ...(options ? options : {}),
              },
              callback,
            );
          }
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch(error => {
      console.log(error);
    });
}
