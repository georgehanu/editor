import React from "react";
import Reconciler from "react-reconciler";
import emptyObject from "fbjs/lib/emptyObject";
import invariant from "fbjs/lib/invariant";
import ReactDOMFrameScheduling from "./ReactDOMFrameScheduling";
import ReactDOMComponentTree from "./ReactDOMComponentTree";

import { createElement } from "../utils/createElement";
import logger from "../../../../shared/logger/logger";

const UPDATE_SIGNAL = {};

const propsToSkip = {
  children: true,
  ref: true,
  key: true,
  style: true,
  image: true
};

const hostConfig = {
  appendInitialChild(canvas, child) {
    logger.info("appendInitialChild", canvas, child);
    canvas.instance.add(child.instance);
  },

  createInstance(type, props, canvas) {
    logger.info("createInstance", type, props, canvas);

    const instance = createElement(type, props);
    return instance;
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    logger.info(
      "createTextInstance",
      text,
      rootContainerInstance,
      internalInstanceHandle
    );
  },

  finalizeInitialChildren(domElement, type, props) {
    logger.info("finalizeInitialChildren", domElement, type, props);
    return false;
  },

  getPublicInstance(instance) {
    logger.info("getPublicInstance", instance);
    return instance;
  },

  prepareForCommit() {
    logger.info("prepareForCommit");
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    logger.info("prepareUpdate", domElement, type, oldProps, newProps);
    return UPDATE_SIGNAL;
  },

  resetAfterCommit() {
    logger.info("resetAfterCommit");
    // Noop
  },

  resetTextContent(domElement) {
    logger.info("resetTextContent");
    // Noop
  },

  shouldDeprioritizeSubtree(type, props) {
    logger.info("shouldDeprioritizeSubtree", type, props);
    return false;
  },

  getRootHostContext() {
    logger.info("getRootHostContext");
    return emptyObject;
  },

  getChildHostContext() {
    logger.info("getChildHostContext");
    return emptyObject;
  },

  scheduleDeferredCallback: ReactDOMFrameScheduling.rIC,

  shouldSetTextContent(type, props) {
    logger.info("shouldSetTextContent", type, props);
    return false;
  },

  // cancelDeferredCallback: ReactScheduler.cancelDeferredCallback,
  now: ReactDOMFrameScheduling.now,

  // The Konva renderer is secondary to the React DOM renderer.
  isPrimaryRenderer: false,

  supportsMutation: true,

  // useSyncScheduling: true,

  appendChild(parentInstance, child) {
    logger.info("appendChild", parentInstance, child);
    parentInstance.instance.add(child.instance);
    child._updatePicture();
  },

  appendChildToContainer(parentInstance, child) {
    logger.info("appendChildToContainer", parentInstance, child);
    parentInstance.instance.add(child.instance);
    child._updatePicture();
  },

  insertBefore(parentInstance, child, beforeChild) {
    logger.info("insertBefore", parentInstance, child, beforeChild);
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    logger.info("insertInContainerBefore", parentInstance, child, beforeChild);
  },

  removeChild(parentInstance, child) {
    logger.info("removeChild", parentInstance, child);
  },

  removeChildFromContainer(parentInstance, child) {
    logger.info("removeChildFromContainer", parentInstance, child);
  },

  commitTextUpdate(textInstance, oldText, newText) {
    logger.info("commitTextUpdate", textInstance, oldText, newText);
  },

  commitMount(instance, type, newProps) {
    logger.info("commitMount", instance, type, newProps);
    // Noop
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    logger.info(
      "commitUpdate",
      instance,
      updatePayload,
      type,
      oldProps,
      newProps
    );
    instance._applyProps(newProps, oldProps);
  }
};

const FabricRenderer = Reconciler(hostConfig);

const foundDevTools = FabricRenderer.injectIntoDevTools({
  findFiberByHostInstance: ReactDOMComponentTree.getClosestInstanceFromNode,
  bundleType: process.env.NODE_ENV !== "production" ? 1 : 0,
  version: React.version || 16,
  rendererPackageName: "react-konva",
  getInspectorDataForViewTag: (...args) => {
    console.log(args);
  }
});

export default FabricRenderer;
export { FabricRenderer };
