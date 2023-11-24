import { createSlice } from "@reduxjs/toolkit";

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    selectedLang: "en",
  },
  reducers: {
    selectLang: (state, action) => {
      state.selectedLang = action.payload;
    },
  },
});

export const { selectLang } = appConfigSlice.actions;

export default appConfigSlice.reducer;
