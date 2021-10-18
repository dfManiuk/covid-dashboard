import { configureStore } from '@reduxjs/toolkit';
import reducer from "../counter/covidSlice";

export const store = configureStore({
  reducer: { covid: reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
