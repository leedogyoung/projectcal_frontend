import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import rootReducer from './modules';
import { persistStore } from 'redux-persist';

// 원본
// const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware => {
//     // if (__DEV__) {
//     //   const createDebugger = require('redux-flipper').default;
//     //   return getDefaultMiddleware().concat(createDebugger());
//     // }
//     return getDefaultMiddleware();
//   },
// });

// 수정본 (0304)
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export const persistor = persistStore(store);

export default store;
export const useAppDispatch = () => useDispatch();
