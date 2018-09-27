import { shape, number, string, oneOfType, oneOf } from "prop-types";
import { objectTypes, objectDefaults } from "./object";
import { merge } from "ramda";

const textTypes = shape(
  merge(objectTypes, {
    fontSize: number,
    fontWeight: oneOfType([number, string]),
    fontFamily: string,
    textDecoration: oneOf(["", "underline", "overline", "line-through"]),
    textAlign: oneOf(["left", "center", "right", "justify"]),
    fontStyle: oneOf(["", "normal", "italic", "oblique"]),
    lineHeight: number,
    textBackgroundColor: string
  })
);

const textDefaults = merge(objectDefaults, {
  type: "text",
  fontSize: 80,
  fontWeight: "normal",
  fontFamily: "Times New Roman",
  textDecoration: "",
  textAlign: "left",
  fontStyle: "",
  lineHeight: 1.16,
  textBackgroundColor: "",
  stroke: null,
  shadow: null,
  stateProperties: merge(objectDefaults.stateProperties, [
    "fontFamily",
    "fontWeight",
    "fontSize",
    "text",
    "textDecoration",
    "textAlign",
    "fontStyle",
    "lineHeight",
    "textBackgroundColor"
  ])
});

export { textTypes, textDefaults };
