import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { parseMetadataToJson } from '@/src/utils/fileUtils';
import { addBook } from '@/src/redux/reducers/Books';
import { useDispatch, useSelector } from 'react-redux';
import { prepareBook } from '@/src/utils/bookUtils';
import AntDesign from '@expo/vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import HorizontalBookItem from '@/components/HorizontalBookItem';
const Page = () => {


  const dispatch = useDispatch();

  const extractMetadata = async (fileUri: string) => {

    // create txt file
    const outputFilePath = `${FileSystem.cacheDirectory}metadata.txt`;
    const outputImagePath = `${FileSystem.cacheDirectory}cover.jpg`;

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

    const book = await prepareBook(metadataJson, outputImagePath);
    dispatch(addBook(book));


    // Run ffmpeg command to extract the embedded image




  };

  const filePicker = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (file.canceled) return;

    extractMetadata(file.assets[0].uri);
  }

  const books = useSelector((state: any) => state.books.books);

  useEffect(() => {
    console.log('books', books);
  }, [books]);

  return (
    <View style={styles.container}>
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
        renderItem={({ item }) => <HorizontalBookItem book={item} />}
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