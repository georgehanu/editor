import { fabric } from "fabric";
import logger from "../../shared/logger/logger";

logger.info(fabric.Image.prototype);

fabric.Canvas.prototype.renderAll = (function(renderAll) {
  return function() {
    logger.info("myrender");
    return renderAll.call(this);
  };
})(fabric.Canvas.prototype.renderAll);

export { fabric };
