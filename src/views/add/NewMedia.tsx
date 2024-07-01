import Text from '../../components/common/Text';
import View from '../../components/common/View';
import {
  CameraIcon,
  CloseIcon,
  PictureIcon,
} from '../../components/common/Icons';
import Button from '../../components/common/buttons/Button';
import {Loader} from '../../components/profile/PostItemList';
import {useEffect, useState} from 'react';
import {colors, useColors} from '../../hooks/customHooks';
import {
  check,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
  openSettings,
  openPhotoPicker,
} from 'react-native-permissions';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Image, Pressable, StyleSheet} from 'react-native';
import FlatList from '../../components/common/FlatList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {
  launchCamera,
  launchImageLibrary,
  launchMediaLibrary,
} from '../../utils/MediaUtil';
import NewPost from './NewPost';
import AddStack from './AddStack';
import NewStory from './NewStory';
import SegmentedButtons from '../../components/common/SegmentedButtons';

const COL_NUM = 3;

const ManageButton = ({theme, onPhotoPick}) => (
  <Button
    title="Manage"
    theme={theme}
    style={{
      padding: 0,
    }}
    labelStyle={{marginBottom: -4}}
    onPress={() => {
      openPhotoPicker().then(value => {
        onPhotoPick();
      });
    }}
  />
);

const ChangeSettingsButton = ({theme}) => (
  <Button
    title="Change settings"
    theme={theme}
    style={{padding: 0}}
    labelStyle={{marginBottom: -4}}
    onPress={() => {
      openSettings();
    }}
  />
);

const EnableButton = ({theme}) => (
  <Button
    title="Enable photo access"
    theme={theme}
    style={{padding: 0}}
    onPress={() => {
      openSettings();
    }}
  />
);

const MediaItem = ({item, selected, onSelect}) => {
  const [_selected, setSelected] = useState(selected);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <View style={[{flex: 1 / COL_NUM, padding: 1}]}>
      <Pressable
        onPress={() => {
          setSelected(!_selected);
          onSelect();
        }}>
        <Image
          style={{
            height: 120,
          }}
          source={{uri: item.uri}}
        />
        <MaterialCommunityIcons
          name={_selected ? 'check-circle' : 'circle-outline'}
          color={_selected ? '#0AAEEF' : 'white'}
          size={22}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
          }}
        />
      </Pressable>
    </View>
  );
};

export const NewMediaScreenOptions = ({navigation}) => {
  return {
    title: '',
    headerLeft: () => <CloseIcon onPress={() => navigation.goBack()} />,
  };
};

export interface Asset {
  width: number;
  height: number;
  uri: 'red';
  type: 'red';
  mediaType: 'photo' | 'video';
  fileName: 'red';
}

export interface Photo {
  index: number;
  width: number;
  height: number;
  uri: 'red';
  filename: 'red';
}

const NewMedia = () => {
  const [postType, setPostType] = useState(NewPost.name);
  const [photos, setPhotos] = useState<{uri: string | null}[]>([]);
  const [photoPick, setPhotoPick] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photoPermission, setPhotoPermission] = useState<PermissionStatus>();
  const {theme, backgroundColor} = useColors();
  const navigation = useNavigation();

  const navigateToAddStack = (screen: string, asset: Asset) => {
    navigation.navigate(AddStack.name, {screen, params: {asset}});
  };

  const mediaCallback = data => {
    if (data.assets?.length && data.assets.length > 0) {
      const asset = data.assets[0];
      asset.mediaType = asset.type.startsWith('image') ? 'photo' : 'video';
      navigateToAddStack(postType, asset);
    }
  };

  const handlePressImage = () => {
    launchMediaLibrary(() => launchImageLibrary(mediaCallback), 'image');
  };

  const handlePressVideo = () => {
    launchMediaLibrary(() => launchCamera(mediaCallback), 'camera');
  };

  useEffect(() => {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
      setPhotoPermission(result);
    });
  }, []);

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(({edges}) => {
        Promise.all(
          edges.map(
            ({
              node: {
                image: {uri},
              },
            }) => CameraRoll.iosGetImageDataById(uri),
          ),
        ).then(result => {
          setPhotos(
            result?.map(item => {
              const {
                node: {
                  image: {filepath, width, height, filename},
                },
              } = item;

              return {uri: filepath, width, height, filename};
            }),
          );
        });
      })
      .catch(err => {
        //Error Loading Images
      });
  }, [photoPermission, photoPick]);

  useEffect(() => {
    if (selectedPhoto) {
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            onPress={() =>
              navigateToAddStack(postType, {
                width: selectedPhoto.width,
                height: selectedPhoto.height,
                uri: selectedPhoto.uri,
                fileName: selectedPhoto.filename,
                type: 'image/png',
                mediaType: 'photo',
              })
            }>
            <Text color={colors.blue}>Next</Text>
          </Pressable>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: null,
      });
    }
  }, [navigation, selectedPhoto, postType]);

  return (
    <View style={{flex: 1, rowGap: 10}}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          rowGap: 10,
          alignItems: 'flex-start',
        }}>
        <View style={{flexDirection: 'row', columnGap: 10}}>
          <Pressable onPress={handlePressVideo}>
            <View
              style={[
                styles.menuItem,
                {
                  backgroundColor:
                    theme === 'dark' ? 'rgb(40, 40, 40)' : 'rgb(235, 235, 235)',
                },
              ]}>
              <CameraIcon />
              <Text size={12}>Camera</Text>
            </View>
          </Pressable>
          <Pressable onPress={handlePressImage}>
            <View
              style={[
                styles.menuItem,
                {
                  backgroundColor:
                    theme === 'dark' ? 'rgb(40, 40, 40)' : 'rgb(235, 235, 235)',
                },
              ]}>
              <PictureIcon />
              <Text size={12}>More Photos</Text>
            </View>
          </Pressable>
        </View>
        {photoPermission === RESULTS.LIMITED ? (
          <>
            <Text style={{}}>
              You've given BePerk access to a selected number of photos and
              videos{' '}
              <ManageButton
                theme={{color: colors.blue, backgroundColor}}
                onPhotoPick={() => setPhotoPick(!photoPick)}
              />
              <Text> or </Text>
              <ChangeSettingsButton
                theme={{color: colors.blue, backgroundColor}}
              />
            </Text>
          </>
        ) : (
          photoPermission !== RESULTS.GRANTED && (
            <>
              <Text>
                Let BePerk access Photos to add recent photos and videos to your
                post
              </Text>
              <EnableButton theme={{color: colors.blue, backgroundColor}} />
            </>
          )
        )}
      </View>
      {photos.length === 0 ? (
        <Loader />
      ) : (
        <FlatList
          data={photos}
          renderItem={({item, index}) => (
            <>
              <MediaItem
                item={item}
                selected={selectedPhoto?.index === index}
                onSelect={() => {
                  if (selectedPhoto?.index !== index) {
                    setSelectedPhoto({
                      index,
                      ...item,
                    });
                  } else {
                    setSelectedPhoto(null);
                  }
                }}
              />
              {index === photos.length - 1 && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1 / COL_NUM,
                  }}>
                  <Pressable onPress={handlePressImage}>
                    <Text>More Photos</Text>
                  </Pressable>
                </View>
              )}
            </>
          )}
          keyExtractor={item => item.uri}
          numColumns={COL_NUM}
          ItemSeparatorComponent={null}
          contentContainerStyle={{paddingBottom: '20%'}}
        />
      )}
      <SegmentedButtons
        style={{position: 'absolute', bottom: 30, alignSelf: 'center'}}
        value={postType}
        onChange={setPostType}
        buttons={[
          {value: NewPost.name, label: 'Post'},
          {value: NewStory.name, label: 'Story'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    rowGap: 7,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default NewMedia;
