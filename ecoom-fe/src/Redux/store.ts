import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import productSaga from "./saga";
import rootproductReducer from "./rootreducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
     admin:rootproductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(productSaga);

export default store;



export type RootState = ReturnType<typeof store.getState>;
