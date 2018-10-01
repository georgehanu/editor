import * as actionTypes from "../actions/actionTypes";

const addImage = (state, action) => {
  const newImage = { ...action.image };
  return { ...state, images: state.images.concat(newImage) };
};

const addbutton = (state = { title: "Add Image", images: [] }, action) => {
  switch (action.type) {
    case actionTypes.ADD_IMAGE:
      return addImage(state, action);
    default:
      return state;
  }
};

export default addbutton;
