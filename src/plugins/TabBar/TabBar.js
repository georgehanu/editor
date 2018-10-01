import React, { Component } from "react";
import { connect } from "react-redux";
import tabBarReducer from "../../stores/reducers/tabBar";
import themeReducer from "../../stores/reducers/theme";
import { toogleTabbar } from "../../stores/actions/tabBar";

class TabBar extends Component {
  render() {
    const images = this.props.images.map(image => {
      return (
        <img
          key="x"
          src={image.src}
          width={image.width}
          height={image.height}
        />
      );
    });
    return (
      <div className="tabBar">
        {images}
        {this.props.expanded ? 1 : 0}
        <button onClick={this.props.toogleTabbar}>toogle</button>
      </div>
    );
  }
}

// let's export the plugin and a set of required reducers
export default {
  TabBarPlugin: connect(
    state => ({
      expanded: state.tabbar.expanded,
      images: state.addbutton.images
    }),
    {
      toogleTabbar
    }
  )(TabBar),
  reducers: { tabbar: tabBarReducer, theme: themeReducer }
};
