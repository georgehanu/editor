import { fabric } from "../../../../../rewrites/fabric/fabric";
import {
  shape,
  number,
  string,
  bool,
  array,
  oneOfType,
  instanceOf
} from "prop-types";

const staticCanvasTypes = shape({
  allowTouchScrolling: bool,
  backgroundColor: oneOfType([string, instanceOf(fabric.Pattern)]),
  backgroundImage: instanceOf(fabric.Image),
  backgroundVpt: bool,
  controlsAboveOverlay: bool,
  enableRetinaScaling: bool,
  FX_DURATION: number,
  imageSmoothingEnabled: bool,
  includeDefaultValues: bool,
  overlayColor: oneOfType([string, instanceOf(fabric.Pattern)]),
  overlayImage: instanceOf(fabric.Image),
  overlayVpt: bool,
  renderOnAddRemove: bool,
  skipOffscreen: bool,
  stateful: bool,
  svgViewportTransformation: bool,
  viewportTransform: array
});

const staticCanvasDefaults = {
  allowTouchScrolling: true,
  backgroundColor: "",
  backgroundImage: null,
  backgroundVpt: true,
  controlsAboveOverlay: false,
  enableRetinaScaling: true,
  FX_DURATION: 500,
  imageSmoothingEnabled: true,
  includeDefaultValues: true,
  overlayColor: "",
  overlayImage: null,
  overlayVpt: true,
  renderOnAddRemove: true,
  skipOffscreen: false,
  stateful: false,
  svgViewportTransformation: true,
  viewportTransform: fabric.iMatrix.concat(),
  vptCoords: []
};

export { staticCanvasTypes, staticCanvasDefaults };
