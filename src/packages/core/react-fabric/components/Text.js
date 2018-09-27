import { fabric } from "../../../../rewrites/fabric/fabric";
import logger from "../../../../shared/logger/logger";
import { textTypes, textDefaults } from "./types/text";

import { FabricObject } from "./fabricObject";

class Text extends FabricObject {
  constructor(props) {
    super(props);
    this._initInstance();
  }

  _initInstance() {
    this.instance = new fabric.Text(this.props.text, this.props);
    this._applyProps(this.props);
  }
}

Text.propTypes = textTypes;
Text.defaultProps = textDefaults;

export default Text;
export { Text };
