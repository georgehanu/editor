import { shape } from "prop-types";
import { textTypes, textDefaults } from "./text";
import { merge } from "ramda";

const ITextTypes = shape(merge(textTypes, {}));

const ITextDefaults = merge(textDefaults, {
  type: "itext",
  fontSize: 120
});

export { ITextTypes, ITextDefaults };
