import { useEffect, useRef } from "react";
import TrackPlayer from "react-native-track-player"

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 100 // 100 MB cache size
    });

    await TrackPlayer.setVolume(0.03);

}
export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {

    const isInitialized = useRef(false);

    useEffect(() => {
        setupPlayer().then(() => {
            isInitialized.current = true;
            onLoad?.();
        })
        .catch((e) => {
            isInitialized.current = false;
            console.error('error', e);
        });
        
    }, [onLoad]);
}
