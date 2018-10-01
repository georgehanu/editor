import React, { Component } from "react";
import { Provider } from "react-redux";

import PluginsContainer from "../../components/plugins/PluginsContainer";
import PluginsUtils from "../../utils/PluginsUtils";

import plugins from "./plugins.js";
import StandardStore from "../../stores/StandardStore";
import pluginsCfg from "./pluginsConfig";

import Theme from "../../components/theme/Theme";

const store = StandardStore(plugins);

const getPluginsConfiguration = () => {
  return {
    standard: pluginsCfg.standard
      .map(plugin => ({
        name: plugin,
        cfg: {}
      }))
      .concat([])
  };
};

const defaultPlugins = PluginsUtils.getPlugins(plugins);

export default class Admin extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="Body center">
          <Theme path="/themes" version="no_version" />
          <PluginsContainer
            mode="standard"
            plugins={PluginsUtils.getPlugins(plugins)}
            pluginsConfig={getPluginsConfiguration()}
          />
        </div>
      </Provider>
    );
  }
}
