import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/UtilUtils";

const toogleTabBar = state => {
  return updateObject(state, { expanded: !state.expanded });
};

const tabBar = (state = { expanded: false }, action) => {
  switch (action.type) {
    case actionTypes.TOOGLE_TABBAR:
      return toogleTabBar(state, action);
    default:
      return state;
  }
};

export default tabBar;
