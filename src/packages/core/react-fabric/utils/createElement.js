import PropTypes from "prop-types";
import StaticCanvas from "../components/StaticCanvas";
import Canvas from "../components/Canvas";
import Image from "../components/Image";
import Text from "../components/Text";
import IText from "../components/IText";

// Creates an element with an element type, props and a root instance

const TYPES = {
  Image: Image,
  Text: Text,
  IText: IText,
  Canvas: Canvas,
  StaticCanvas: StaticCanvas
};
function createElement(type, props, ref = null) {
  // Resolve default props
  let forwardedProps = { ...props };
  if (TYPES[type] && TYPES[type].defaultProps) {
    const defaultProps = TYPES[type].defaultProps;
    for (let propName in defaultProps) {
      if (props[propName] === undefined) {
        forwardedProps[propName] = defaultProps[propName];
      }
    }
  }

  PropTypes.checkPropTypes(TYPES[type].propTypes, forwardedProps);

  const COMPONENTS = {
    StaticCanvas: () => new StaticCanvas(ref, forwardedProps),
    Canvas: () => new Canvas(ref, forwardedProps),
    Image: () => new Image(forwardedProps),
    Text: () => new Text(forwardedProps),
    IText: () => new IText(forwardedProps),
    default: undefined
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement };
