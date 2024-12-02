import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';

export const parseMetadataToJson = (metadataContent: string) => {
  const lines = metadataContent.split('\n');
  const metadata: { [key: string]: any } = {};
  let currentChapter: { [key: string]: string } | null = null;

  lines.forEach(line => {
    if (line.startsWith('[CHAPTER]')) {
      if (currentChapter) {
        if (!metadata.chapters) {
          metadata.chapters = [];
        }
        metadata.chapters.push(currentChapter);
      }
      currentChapter = {};
    } else if (currentChapter) {
      const [key, value] = line.split('=');
      if (key && value) {
        currentChapter[key.trim()] = value.trim();
      }
    } else {
      const [key, value] = line.split('=');
      if (key && value) {
        metadata[key.trim()] = value.trim();
      }
    }
  });

  // Add the last chapter if it exists
  if (currentChapter) {
    if (!metadata.chapters) {
      metadata.chapters = [];
    }
    metadata.chapters.push(currentChapter);
  }
  const enhancedMetadata = {
    ...metadata,
    id: uuid.v4(),
    chapters: metadata.chapters.map((chapter: { [key: string]: string }) => ({
      ...chapter,
      startSeconds: parseInt(chapter.START) / (chapter.TIMEBASE === '1/10000000' ? 10000000 : 1000),
      endSeconds: parseInt(chapter.END) / (chapter.TIMEBASE === '1/10000000' ? 10000000 : 1000),
      durationSeconds: (parseInt(chapter.END) - parseInt(chapter.START)) / (chapter.TIMEBASE === '1/10000000' ? 10000000 : 1000),
    })),
    totalDurationSeconds: metadata.chapters.reduce((acc: number, chapter: { [key: string]: string }) => acc + (parseInt(chapter.END) - parseInt(chapter.START)), 0) / (metadata.TIMEBASE === '1/10000000' ? 10000000 : 1000),
  };
  return enhancedMetadata;
};

export const copyFile = async (source: string, id: string, type: 'audio' | 'image') => {
  try {
    // create folder
    const file = type === 'audio' ? 'audio.aac' : 'cover.jpg';
    const destination = `${FileSystem.documentDirectory}/${id}/${file}`;
    // check if directory exists
    const directoryInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/${id}`);
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/${id}`)
    }

    await FileSystem.copyAsync({
      from: source,
      to: destination,
    });

    return destination;
  } catch (error) {
    console.error('Error copying file:', error);
    throw error;
  }
}


