import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    questions: [],
    response: [],
    questionsColor: [],
    time: 0,
    isFetching: false,
    isSubmitted: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isFetching = true;
    },
    fetchSuccess: (state, action) => {
      state.isFetching = false;
      state.isSubmitted = false;
      state.email = action.payload.email;
      state.questions = action.payload.questions;
      state.time = 1800;
      state.response = action.payload.response;
      state.questionsColor = action.payload.questionsColor;
    },
    fetchFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserTime: (state, action) => {
      state.time = action.payload;
    },
    updateSelectedOption: (state, action) => {
      console.log(action.payload);
      state.response[action.payload.index] = action.payload.selectedOption;
    },
    updateQuestionColor: (state, action) => {
      state.questionsColor[action.payload.index] = action.payload.color;
    },
    updateIsSubmitted: (state) => {
      state.isSubmitted = true;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  updateUserTime,
  updateSelectedOption,
  updateQuestionColor,
  updateIsSubmitted,
} = userSlice.actions;
export default userSlice.reducer;
