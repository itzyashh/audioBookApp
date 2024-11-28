import { Event, useTrackPlayerEvents } from "react-native-track-player"

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackActiveTrackChanged
]
export const useLogTrackPlayer = () => {
    useTrackPlayerEvents(events, async (event) => {
        if (event.type === Event.PlaybackState) {
            console.log('playback state', event.state);
        }
        if (event.type === Event.PlaybackError) {
            console.log('playback error', event);
        }
        if (event.type === Event.PlaybackActiveTrackChanged) {
            console.log('playback active track', event.track);
        }
    })
}