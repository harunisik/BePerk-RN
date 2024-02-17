import {View} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal as GorhomBottomSheetModal,
} from '@gorhom/bottom-sheet';

const BottomSheetModal = ({children, isOpen, setIsOpen}) => {
  const bottomSheetModalRef = useRef<GorhomBottomSheetModal>(null);
  const [snapPoints, setSnapPoints] = useState(['25%']);

  const onContentLayout = useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }) => setSnapPoints([height + 50]),
    [],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    }
  }, [isOpen]);

  return (
    <GorhomBottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onDismiss={() => setIsOpen(false)}
      backdropComponent={renderBackdrop}>
      <View onLayout={onContentLayout}>{children}</View>
    </GorhomBottomSheetModal>
  );
};

export default BottomSheetModal;
