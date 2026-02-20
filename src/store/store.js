import { configureStore } from '@reduxjs/toolkit';
import attributeSlice from './attribute-slice';

const store = configureStore({
  reducer: { attribute: attributeSlice.reducer },
});

export default store;
