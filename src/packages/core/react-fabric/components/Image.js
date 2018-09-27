import { fabric } from "../../../../rewrites/fabric/fabric";
import logger from "../../../../shared/logger/logger";
import { merge } from "ramda";
import { imageTypes, imageDefaults } from "./types/image";

import { FabricObject } from "./fabricObject";

class Image extends FabricObject {
  constructor(props) {
    super(props);
    logger.info("new props", props);
    const tmpImage = new window.Image();
    tmpImage.src = props.src;

    this.instance = new fabric.Image(tmpImage, props);
    this._applyProps(props);

    tmpImage.onload = () => {
      logger.info("tmpImage loaded");
      this._updatePicture();
    };
  }
}

Image.propTypes = imageTypes;

Image.defaultProps = imageDefaults;

export default Image;
export { Image };
