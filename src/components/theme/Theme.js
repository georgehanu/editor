/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from "prop-types";
import React, { Component } from "react";
import withSideEffect from "react-side-effect";
import { connect } from "react-redux";
import { trim } from "ramda";

class Theme extends Component {
  render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    }
    return null;
  }
}

Theme.propTypes = {
  theme: PropTypes.string.isRequired,
  version: PropTypes.string,
  onLoad: PropTypes.func
};

Theme.defaultProps = {
  theme: "base"
};

const reducePropsToState = props => {
  console.log("reducePropsToState");
  const innermostProps = props[props.length - 1];
  if (innermostProps && innermostProps.version) {
    return {
      version: "?" + trim(innermostProps.version),
      theme: innermostProps.theme || "base",
      themeElement: innermostProps.themeElement || "theme_stylesheet",
      path: innermostProps.path || "dist/themes",
      onLoad: innermostProps.onLoad || null
    };
  }
  return null;
};

const handleStateChangeOnClient = themeCfg => {
  console.log("handleStateChangeOnClient", themeCfg);
  if (themeCfg && themeCfg.theme) {
    let link = document.getElementById(themeCfg.themeElement);

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("id", themeCfg.themeElement);
      document.head.insertBefore(link, document.head.firstChild);
    }
    const basePath =
      (link.href && link.href.substring(0, link.href.lastIndexOf("/"))) ||
      themeCfg.path;
    const currentPath =
      (link.href &&
        link.href.substring(link.href.lastIndexOf("/"), link.href.length)) ||
      "";
    const newPath = "/" + themeCfg.theme + ".css" + themeCfg.version;
    if (currentPath !== newPath) {
      link.setAttribute("href", basePath + newPath);
    } else if (currentPath === newPath && themeCfg.onLoad && !link.onload) {
      themeCfg.onLoad();
    }

    if (themeCfg.onLoad && !link.onload) {
      link.onload = () => {
        themeCfg.onLoad();
      };
    }
  }
};

const mapStateToProps = state => {
  return {
    theme: (state.theme && state.theme.theme) || "base"
  };
};

export default connect(mapStateToProps)(
  withSideEffect(reducePropsToState, handleStateChangeOnClient)(Theme)
);
