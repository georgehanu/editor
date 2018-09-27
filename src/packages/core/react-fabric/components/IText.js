import { fabric } from "../../../../rewrites/fabric/fabric";
import logger from "../../../../shared/logger/logger";
import { ITextTypes, ITextDefaults } from "./types/itext";

import { Text } from "./Text";

class IText extends Text {
  _initInstance() {
    this.instance = new fabric.IText(this.props.text, this.props);
    this._applyProps(this.props);
  }
}

IText.propTypes = ITextTypes;
IText.defaultProps = ITextDefaults;

export default IText;
export { IText };
