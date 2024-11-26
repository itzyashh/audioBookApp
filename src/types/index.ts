export type Chapter = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
};

export type Bookmark = {
  id: number;
  chapterId: number;
  time: string;
  note?: string;
};

export type Book = {
  id: number;
  title: string;
  image: string;
  isAudioBook: boolean;
  duration?: string;
  readPercentage?: number;
  chapters?: Chapter[];
  bookmarks?: Bookmark[];
};