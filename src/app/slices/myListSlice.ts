import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ListState {
  myList: any[];
  ratedShows: { type: "tv" | "movie", id: number, likeStatus: 0 | 1 | 2 | 3 }[]
}

const initialState: ListState = {
  myList: [
    // { id: 0, type: "movie" }
  ],
  ratedShows: [
    // { type: 'tv', id: 0, likeStatus: 0 }
  ],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );



export const myListSlice = createSlice({
  name: 'myList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLikeStatus: (state, action) => {
      const { type, id, likeStatus } = action.payload

      //RatedShow entry exist
      let exist = state.ratedShows.findIndex(record => {
        if (record.id === id && record.type === type) return record;
      })

      if (exist > -1) {
        if (likeStatus === state.ratedShows[exist].likeStatus) {
          //remove if likeStatus 0 (no like status)
          state.ratedShows = state.ratedShows.filter(record => {
            if (!(record.id === id && record.type === type)) return record
          })

        } else state.ratedShows[exist].likeStatus = likeStatus;  //replace
      } else state.ratedShows.push({ type, id, likeStatus }) //add new entry
    },

    addToMyList: (state, action) => {
      const { id, type } = action.payload;
      let inMyList = state.myList.some(show => {
        if (show.id === id && show.type === type) return true
      });


      if (inMyList) {
        //removing
        state.myList = state.myList.filter(show => {
          if (!(show.id === id && show.type === type)) return true
        })
      } else state.myList.push(action.payload);

    }

  },

});

export const { setLikeStatus, addToMyList } = myListSlice.actions

export const selectRatedShows = (state: RootState) => state.myList.ratedShows;
export const selectShowsInMyList = (state: RootState) => state.myList.myList;

export const getLikeStatus = (id: number, type: "tv" | "movie", state: RootState) => {
  const likeStatus = state.myList.ratedShows.find(element => {
    if (element.id === id && element.type === type) return element
  })
  if (likeStatus !== undefined) return likeStatus.likeStatus
  else return 0
}

export const checkIfInMyList = (id: number, type: "tv" | "movie", state: RootState) => {
  // console.log(id, type)
  const inMyList = state.myList.myList.some(element => {
    if (element.id === id && element.type === type) return true
  })
  // console.log(inMyList, "is it")
  return inMyList
}

export default myListSlice.reducer;

