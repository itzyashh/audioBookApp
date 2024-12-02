import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useActiveTrack, usePlaybackState,State } from 'react-native-track-player'
import { FontAwesome6 } from '@expo/vector-icons'
import PlayPauseButton from './PlayPauseButton'
import { moderateScale, scale } from 'react-native-size-matters'

const FloatingPlayer = () => {

  const track = useActiveTrack()
  if (!track) return null

  // const playerState = usePlaybackState();
  // const isPlaying = playerState === State.Playing;

  return (
    <View style={styles.container}>
        <Image 
        source={{ uri: track.artwork }}
        style={styles.image} />
        <View style={styles.info}>
            <Text
              numberOfLines={1}
             style={styles.title}>{track.title}</Text>
            <Text style={styles.artist}>{track.artist}</Text>
        </View>
        <PlayPauseButton style={styles.icon} iconSize={24} />
    </View>
  )
}

export default FloatingPlayer

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: moderateScale(10),
        backgroundColor: '#12111d',
        padding: scale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        margin: scale(10),
        shadowColor: "#505050",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8,
    },
    image: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    info: {
      width: '75%',
      paddingHorizontal: moderateScale(10),
      gap: scale(7),
    },
    title: {
        color: '#fff',
        fontSize: moderateScale(12),
        fontWeight: '600',
    },
    artist: {
        color: '#e1e1e1',
        fontSize: moderateScale(10),
        fontWeight: '500',
    },
    icon: {
        height: moderateScale(30),      
        width: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
})