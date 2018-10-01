import React from "react";
import PropTypes from "prop-types";
import { componentFromProp } from "recompose";
import PluginsUtils from "../../utils/PluginsUtils";
import { path } from "ramda";
const Component = componentFromProp("component");

class PluginsContainer extends React.Component {
  state = {
    loadedPlugins: {}
  };

  loadPlugins = (state, newProps) => {};

  getState = (path, newProps) => {
    let props = newProps || this.props;
    return path(path, props.monitoredState) || path(path, this.props.params);
  };

  getPluginDescriptor = plugin => {
    return PluginsUtils.getPluginDescriptor(
      this.props.plugins,
      this.props.pluginsConfig[this.props.mode],
      plugin
    );
  };

  renderPlugins = plugins => {
    return plugins
      .map(this.getPluginDescriptor)
      .map(Plugin => (
        <Plugin.impl
          key={Plugin.id}
          {...this.props.params}
          {...Plugin.cfg}
          pluginCfg={Plugin.cfg}
          items={Plugin.items}
        />
      ));
  };

  render() {
    const pluginsConfig = this.props.pluginsConfig.standard;
    if (pluginsConfig) {
      const { bodyPlugins } = PluginsUtils.mapPluginsPosition(pluginsConfig);

      return (
        <Component component={this.props.component}>
          {this.renderPlugins(bodyPlugins)}
        </Component>
      );
    }
    return null;
  }
}

PluginsContainer.propTypes = {
  mode: PropTypes.oneOf(["desktop", "mobile"]),
  plugins: PropTypes.object,
  component: PropTypes.any,
  id: PropTypes.string,
  className: PropTypes.string
};

PluginsContainer.defaultProps = {
  mode: "desktop",
  plugins: {},
  component: "div",
  id: "plugins-container",
  className: "plugins-container"
};

export default PluginsContainer;
