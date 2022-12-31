import { persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./authReducers";
import asyncStorageKey from "../../Constants/Index";

const config = {
  key: asyncStorageKey,
  storage: AsyncStorage,
  blacklist: [],
};

const appReducer = persistCombineReducers(config, {
  auth: authReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
