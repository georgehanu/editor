import { shape, oneOf, string, number } from "prop-types";
import { objectTypes, objectDefaults } from "./object";
import { merge } from "ramda";

const imageTypes = shape(
  merge(objectTypes, {
    cacheKey: string,
    cropX: number,
    cropY: number,
    crossOrigin: oneOf(["", "anonymous", "use-credentials"]),
    minimumScaleTrigger: number
  })
);

const imageDefaults = merge(objectDefaults, {
  cacheKey: "",
  cropX: 0,
  cropY: 0,
  type: "image",
  crossOrigin: "",
  minimumScaleTrigger: 0.5
});

export { imageTypes, imageDefaults };
