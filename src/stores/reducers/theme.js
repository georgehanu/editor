import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/UtilUtils";

const changeTheme = (state, action) => {
  return updateObject(state, { theme: action.theme });
};

const theme = (state = { theme: "base" }, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      return changeTheme(state, action);
    default:
      return state;
  }
};

export default theme;
