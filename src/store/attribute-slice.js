import { createSlice } from '@reduxjs/toolkit';

const attributeSlice = createSlice({
  name: 'attribute',
  initialState: {
    theme: JSON.parse(localStorage.getItem('theme')),
    language: JSON.parse(localStorage.getItem('language')),
  },
  reducers: {
    changeAttributeValue(state, action) {
      state[action.payload.key] = action.payload.value;
      document.documentElement.setAttribute(action.payload.key, action.payload.value);
    },
  },
});

export const attributeActions = attributeSlice.actions;

export default attributeSlice;
