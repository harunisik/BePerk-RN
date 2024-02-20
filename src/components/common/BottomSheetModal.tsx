import {View} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal as GorhomBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useStore} from '../../containers/StoreContainer';
import {ModalActionType} from '../../containers/ModalAction';

const BottomSheetModal = () => {
  const bottomSheetModalRef = useRef<GorhomBottomSheetModal>(null);
  const [snapPoints, setSnapPoints] = useState(['25%']);
  const {
    dispatch,
    store: {
      modalInfo: {isOpen, component: ModalContent},
    },
  } = useStore();

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
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <GorhomBottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onDismiss={() => dispatch({type: ModalActionType.CLOSE})}
      backdropComponent={renderBackdrop}>
      <View onLayout={onContentLayout}>{ModalContent}</View>
    </GorhomBottomSheetModal>
  );
};

export default BottomSheetModal;
