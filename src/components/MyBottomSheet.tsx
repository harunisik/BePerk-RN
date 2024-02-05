import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import common from '../styles/sharedStyles';

const MyBottomSheet = () => {
  const {flex1, aiCenter} = common;

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <View style={[styles.container, flex1]}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={[flex1, aiCenter]}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'grey',
  },
});

export default MyBottomSheet;
