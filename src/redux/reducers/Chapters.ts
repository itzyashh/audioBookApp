import { Chapter } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit";

type ChaptersState = {
    chapters: Chapter[];
  };
  
  const initialState: ChaptersState = {
    chapters: [],
  };

    const chapterSlice = createSlice({
        name: "Chapter",
        initialState,
        reducers: {
            addChapter: (state, action) => {
                state.chapters.push(action.payload);
            },
            removeChapter: (state, action) => {
                state.chapters = state.chapters.filter((chapter) => chapter.id !== action.payload);
            },
            removeAllChapters: (state) => {
                state.chapters = [];
            }
        }
    });

export const { addChapter, removeChapter, removeAllChapters } = chapterSlice.actions;
export default chapterSlice.reducer;