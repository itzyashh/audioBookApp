import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { parseMetadataToJson } from '@/src/utils/fileUtils';
import { addBook } from '@/src/redux/reducers/Books';
import { useDispatch, useSelector } from 'react-redux';
import { prepareBook } from '@/src/utils/bookUtils';
import AntDesign from '@expo/vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import HorizontalBookItem from '@/components/HorizontalBookItem';
import AudioPlayer from '@/components/AudioPlayer';
import  FloatingPlayer  from '@/components/FloatingPlayer';
import TrackPlayer from 'react-native-track-player';
import { Book } from '@/src/types';
const Page = () => {


  const dispatch = useDispatch();

  const extractMetadata = async (fileUri: string) => {

    // create txt file
    const outputFilePath = `${FileSystem.cacheDirectory}metadata.txt`;
    const outputImagePath = `${FileSystem.cacheDirectory}cover.jpg`;
    const outputAudioPath = `${FileSystem.cacheDirectory}audio.aac`;

    // check if file exists
    const fileExists = await FileSystem.getInfoAsync(outputFilePath);
    if (fileExists.exists) console.log('File exists:', fileExists.exists);

    await FileSystem.writeAsStringAsync(outputFilePath, '');


    // run ffmpeg command
    const ffmpegCommand = `-y -i ${fileUri} -f ffmetadata ${outputFilePath}`;
    const session = FFmpegKit.execute(ffmpegCommand);
    const state = (await session).getState().then((state) => {
      console.log('FFmpegKit.State', state);
    })

    const metadataContent = await FileSystem.readAsStringAsync(outputFilePath);
    const metadataJson = parseMetadataToJson(metadataContent);
    console.log('metadataJson', metadataJson);
    const ffmpegImageCommand = `-y -i ${fileUri} -an -vcodec copy ${outputImagePath}`;
    const imageSession = await FFmpegKit.execute(ffmpegImageCommand);

    try {
      const ffmpegAudioCommand = `-y -i ${fileUri} -vn -acodec copy ${outputAudioPath}`;



      const audioSession = await FFmpegKit.execute(ffmpegAudioCommand);
      const returnCode = await audioSession.getReturnCode();
    
      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Audio transcoded successfully to MP3:', outputAudioPath);
      } else {
        const logs = await audioSession.getLogsAsString();
        console.error('FFmpeg MP3 transcoding failed:', logs);
      }
    } catch (error) {
      console.error('Error during MP3 transcoding:', error);
    }
    

    const book = await prepareBook(metadataJson, outputImagePath, outputAudioPath);
    dispatch(addBook(book));


    // Run ffmpeg command to extract the embedded image




  };

  const filePicker = async () => {
    const file = await DocumentPicker.getDocumentAsync();

    if (file.canceled) return;

    extractMetadata(file.assets[0].uri);
  }

  const books = useSelector((state: any) => state.books.books);

  useEffect(() => {
    console.log('books', books);
  }, [books]);

  const onBookPress = useCallback(async (book: Book) => {
    console.log('onBookPress', book);
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: book.id,
      url: book.audio,
      title: book.title,
      artist: book.artist,
      artwork: book.cover,
    });
    await TrackPlayer.play();

  }, []);

  return (
    <View style={styles.container}>
      <AudioPlayer />
      <View style={styles.addBox}>
        <TouchableOpacity onPress={filePicker}
          style={styles.innerBox}
        >
          <View>
            <Text
              style={styles.btnTitle}
            >Import Audiobooks</Text>
            <Text
              style={styles.btnSubTitle}
            >File Type .m4b</Text>
          </View>
          <AntDesign name="pluscircle" size={moderateScale(20)} color="#8888ec" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={books}
        renderItem={({ item }) => <HorizontalBookItem book={item} onItemPress={onBookPress} />}
        style={{ padding: scale(10) }}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: { flex: 1 },
  addBox: { backgroundColor: '#6363d8', margin: moderateScale(10), borderRadius: moderateScale(10) },
  innerBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: scale(10), paddingHorizontal: moderateScale(20) },
  btnTitle: { 
    color: '#fff',
    fontSize: moderateScale(13),
   },
  btnSubTitle: {
     color: '#b3b3e5',
      fontSize: moderateScale(10),
     },

})