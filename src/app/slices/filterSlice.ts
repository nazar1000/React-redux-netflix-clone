

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
// import { fetchCount } from './counterAPI';

export interface ListState {
  filter: {
    filterType: "general" | "language", //view mode/BrowseByLang page
    genreOption: string, //genre name
    sortOption: 0 | 1 | 2 | 3, // 1)Suggested for you, 2) year Released, 3)Votes Desc, 4)Votes Asc
    type: "movie" | "tv",
    languageType: "original" | "dubbing" | "subtitles"
    languageOption: string // languages
  }
  viewMode: "full" | "tiles"
}

const initialState: ListState = {
  filter: { filterType: "general", genreOption: "", sortOption: 0, type: "tv", languageOption: "English", languageType: "original" },
  viewMode: "full"
};


// updateFilter: Function(),
//  updateViewMode: Function()

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateFilter: (state, action) => {
      const { type, value } = action.payload
      // console.log(type)

      if (type === "filterType") state.filter.filterType = value;
      if (type === "genreOption") state.filter.genreOption = value;
      if (type === "sortOption") state.filter.sortOption = value;
      if (type === "type") state.filter.type = value;
      if (type === "languageOption") state.filter.languageOption = value;
      if (type === "languageType") state.filter.languageType = value;

    },

    updateViewMode: (state, action) => {
      state.viewMode = action.payload
    }

  },

});

export const { updateFilter, updateViewMode } = filterSlice.actions

export const getFilters = (state: RootState) => state.filter.filter;
export const getViewMode = (state: RootState) => state.filter.viewMode;


export default filterSlice.reducer;

