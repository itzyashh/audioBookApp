import { copyFile } from "./fileUtils";

export const prepareBook = async (book: any, coverPath: string, audioPath?: string) => {
    const imagePath = await copyFile(coverPath, book.id.toString(), 'image');
    const aacPath = audioPath ? await copyFile(audioPath, book.id.toString(), 'audio') : undefined;
    console.log('aacPath', aacPath);
    const bookData = {
        ...book,
        cover: imagePath,
        audio: aacPath,
    };

    console.log('bookData', bookData);

    return bookData;
}
