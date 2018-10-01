import * as actionTypes from "./actionTypes";

export const addImage = () => {
  return {
    type: actionTypes.ADD_IMAGE,
    image: {
      id: "image-" + 2 + Math.random() * 100,
      type: "image",
      width: Math.random() * 500,
      height: Math.random() * 500,
      left: Math.random() * 500,
      top: Math.random() * 500,
      src:
        "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg"
    }
  };
};
