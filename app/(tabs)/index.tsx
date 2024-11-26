import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
const Page = () => {

  const extractMetadata = async (fileUri: string) => {

    // create txt file
    const outputFilePath = `${FileSystem.cacheDirectory}metadata.txt`;
    await FileSystem.writeAsStringAsync(outputFilePath, '');

    const command = `ffmpeg -i ${fileUri} -f ffmetadata ${outputFilePath}`;
    FFmpegKit.execute(command).then((session) => {
      console.log('Metadata extracted!');
    });
    
  };

  const filePicker = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (file.canceled) return;

    extractMetadata(file.assets[0].uri);
  }



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity 
      onPress={() => filePicker()}
       style={{
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        margin: 10,
      }}>
        <Text>File Picker</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})