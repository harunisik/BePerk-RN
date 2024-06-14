import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useColors} from '../../hooks/customHooks';
import {
  BottomSheetModal as GBottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const BottomSheetModal = ({visible, onDismiss, children, snapPoints}) => {
  const {theme, backgroundColor, color} = useColors();
  const _backgroundColor =
    theme === 'dark' ? 'rgb(30, 30, 30)' : backgroundColor;

  //
  const bottomSheetModalRef = useRef<GBottomSheetModal>(null);
  const _snapPoints = useMemo(() => snapPoints ?? ['25%'], [snapPoints]);

  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} opacity={0.75} disappearsOnIndex={-1} />
    ),
    [],
  );

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);
  //

  return (
    <GBottomSheetModal
      ref={bottomSheetModalRef}
      // index={1}
      snapPoints={_snapPoints}
      // onChange={handleSheetChanges}
      onDismiss={onDismiss}
      handleStyle={{
        backgroundColor: _backgroundColor,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
      handleIndicatorStyle={{backgroundColor: color}}
      backdropComponent={renderBackdrop}
      // enableDynamicSizing
    >
      <BottomSheetView
        style={{
          flex: 1,
          alignItems: 'center',
          // justifyContent: 'center',
          backgroundColor: _backgroundColor,
        }}>
        {children}
      </BottomSheetView>
    </GBottomSheetModal>
  );
};

export default BottomSheetModal;
