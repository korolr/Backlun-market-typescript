import { rootReducer } from "../reducers"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension" // eslint-disable-line
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "../sagas/rootSaga"

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: "root",
  blacklist: ["registration", "basket", "login"],

  debug: !(process.env.NODE_ENV === "production"),
  storage,
}

const middleware =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk, sagaMiddleware)
    : composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, middleware)
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
