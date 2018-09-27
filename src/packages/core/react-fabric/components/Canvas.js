import { fabric } from "../../../../rewrites/fabric/fabric";
import logger from "../../../../shared/logger/logger";
import { StaticCanvas } from "./StaticCanvas";
import { canvasTypes, canvasDefaults } from "./types/canvas";

class Canvas extends StaticCanvas {
  _initInstance() {
    this.instance = new fabric.Canvas(this.ref);
    this._applyProps(this.props);
  }

  static PropTypes = canvasTypes;
  static defaultProps = canvasDefaults;
}

export default Canvas;
export { Canvas };
