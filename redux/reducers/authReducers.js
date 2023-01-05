import {
  UPDATE_ONBOARDING_STATUS,
  UPDATE_USER_LOGIN,
  UPDATE_USER_ACCESS_TOKEN,
  LOGOUT_ACTION,
} from "../constants/Index";

const initialState = {
  isOnboardingDisabled: false,
  isLoggedIn: false,
  user: {},
  accessToken: "",
};

const authReducer = (state = initialState, action) => {
  const { status, type, isLoggedIn, user, accessToken } = action;

  switch (type) {
    case UPDATE_ONBOARDING_STATUS:
      return { ...state, isOnboardingDisabled: status };

    case UPDATE_USER_LOGIN:
      return { ...state, user, isLoggedIn };

    case UPDATE_USER_ACCESS_TOKEN:
      return { ...state, accessToken };

    case LOGOUT_ACTION:
      return { ...state, isLoggedIn: false };

    default:
      return state;
  }
};

export default authReducer;
