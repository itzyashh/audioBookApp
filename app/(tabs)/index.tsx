import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { parseMetadataToJson } from '@/src/utils/fileUtils';
import { addBook } from '@/src/redux/reducers/Books';
import { useDispatch, useSelector } from 'react-redux';
import { prepareBook } from '@/src/utils/bookUtils';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    </View>
  )
}

export default Page

const styles = StyleSheet.create({})