import { Bookmark } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit";

type BookmarksState = {
    bookmarks: Bookmark[];
  };

const initialState: BookmarksState = {
    bookmarks: [],
};

const bookmarkSlice = createSlice({
    name: "Bookmark",
    initialState,
    reducers: {
        addBookmark: (state, action) => {
            state.bookmarks.push(action.payload);
        },
        removeBookmark: (state, action) => {
            state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== action.payload);
        },
        removeAllBookmarks: (state) => {
            state.bookmarks = [];
        }
    }
});

export const { addBookmark, removeBookmark, removeAllBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
        