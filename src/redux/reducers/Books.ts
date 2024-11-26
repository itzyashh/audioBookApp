import { Book } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit";


type BooksState = {
    books: Book[];
  };

const initialState: BooksState = {
    books: [],
};

const bookSlice = createSlice({
    name: "Book",
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        removeBook: (state, action) => {
            state.books = state.books.filter((book) => book.id !== action.payload);
        },
        removeAllBooks: (state) => {
            state.books = [];
        }
    }
});

export const { addBook, removeBook, removeAllBooks } = bookSlice.actions;
export default bookSlice.reducer;

