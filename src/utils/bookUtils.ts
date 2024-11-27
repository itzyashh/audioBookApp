import { copyFile } from "./fileUtils";

export const prepareBook = async (book: any, coverPath: string, audioPath?: string) => {
    const imagePath = await copyFile(coverPath, book.id.toString(), 'image');
    console.log('imagePathz', imagePath);
    const bookData = {
        ...book,
        cover: imagePath,
        audio: audioPath,
    };

    console.log('bookData', bookData);

    return bookData;
}
