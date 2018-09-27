import { createStore } from "redux";
import reducer from "./store/reducer";
import Renderer from "./components/Renderer/Renderer";

let instance = null;

class Editor {
  constructor() {
    if (instance) {
      console.warn(
        "You defined multiple instances of the Editor class, this can cause problems."
      );
    }
    instance = this;

    this.store = createStore(reducer);
  }

  getState() {
    return this.store.getState();
  }
}

export { Renderer, Editor };

export default Editor;
