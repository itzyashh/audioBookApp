import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { closeBottomSheet } from '@/src/redux/reducers/Drawer';

type AudioPlayerProps = {
};

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const { isVisible } = useSelector((state: any) => state.drawer);
    console.log('isVisible', isVisible);
    const dispatch = useDispatch();
    useEffect(() => {
        isVisible ? bottomSheetModalRef.current?.present() : bottomSheetModalRef.current?.dismiss();
    }
    , [isVisible]);


  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      dispatch(closeBottomSheet());
    }
  }, []);

  // snap points
    const snapPoints = useMemo(() => ['100%'], []);

  // renders
  return (

      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={{width:270,height:270,backgroundColor:'red'}} />
        </BottomSheetView>
      </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',

    backgroundColor:'black'
  },
});

export default AudioPlayer;