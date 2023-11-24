import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovieList: null,
    tmdbMovieResults: null,
  },
  reducers: {
    toggleGptSearch: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovies: (state, action) => {
      const { gptMovieList, tmdbMovieResults } = action.payload;
      state.gptMovieList = gptMovieList;
      state.tmdbMovieResults = tmdbMovieResults;
    },
  },
});

export const { toggleGptSearch, addGptMovies } = gptSlice.actions;

export default gptSlice.reducer;
