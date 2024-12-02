import { Pressable, ViewStyle } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';

type PlayPauseButtonProps = {
    style?: ViewStyle;
    iconSize?: number;
}


const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ style, iconSize }) => {

    const {playing} = useIsPlaying()

    const onTogglePlayback = () => {
        playing ? TrackPlayer.pause() : TrackPlayer.play()
    }

  return (
    <Pressable 
    onPress={onTogglePlayback}
    style={style}>
    <FontAwesome6 name={playing ? 'pause' : 'play'}
     size={iconSize || 24} color="#ffffff" />
    </Pressable>
  )
}

export default PlayPauseButton
