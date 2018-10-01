import * as actionTypes from "./actionTypes";

export const changeTheme = theme => {
  return {
    type: actionTypes.CHANGE_THEME,
    theme
  };
};
