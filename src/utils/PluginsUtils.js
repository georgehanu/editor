import { combineReducers } from "redux";
import { omit, is } from "ramda";
import assign from "object-assign";

// const getPluginItems = (
//   state,
//   plugins,
//   pluginsConfig,
//   name,
//   id,
//   isDefault,
//   loadedPlugins,
//   filter
// ) => {
//   return Object.keys(plugins)
//     .filter(plugin => plugins[plugin][name])
//     .filter(plugin => {
//       const cfgObj = isPluginConfigured(pluginsConfig, plugin);
//       return (
//         cfgObj && showIn(state, plugins.requires, cfgObj, name, id, isDefault)
//       );
//     })
//     .filter(
//       plugin =>
//         getMorePrioritizedContainer(
//           plugins[plugin],
//           pluginsConfig,
//           plugins[plugin][name].priority || 0
//         ).plugin === null
//     )
//     .map(plugin => {
//       const pluginName = plugin.substring(0, plugin.length - 6);
//       const pluginImpl = includeLoadedItem(
//         pluginName,
//         loadedPlugins,
//         plugins[plugin]
//       );
//       const pluginCfg = isPluginConfigured(pluginsConfig, plugin);
//       const item = pluginImpl[name].impl || pluginImpl[name];
//       return assign(
//         {
//           name: pluginName
//         },
//         item,
//         (pluginCfg.override && pluginCfg.override[name]) || {},
//         {
//           cfg: assign(
//             {},
//             pluginImpl.cfg || {},
//             (pluginCfg &&
//               parsePluginConfig(
//                 state,
//                 plugins.requires,
//                 pluginCfg.cfg || {}
//               )) ||
//               undefined
//           )
//         },
//         {
//           plugin: pluginImpl,
//           items: getPluginItems(
//             state,
//             plugins,
//             pluginsConfig,
//             pluginName,
//             null,
//             true,
//             loadedPlugins
//           )
//         }
//       );
//     })
//     .filter(
//       item =>
//         filterDisabledPlugins(item, state, plugins) && (!filter || filter(item))
//     );
// };

const getReducers = plugins =>
  Object.keys(plugins)
    .map(name => plugins[name].reducers)
    .reduce((previous, current) => assign({}, previous, current), {});

const PluginsUtils = {
  /**
   * Produces the reducers from the plugins, combined with other plugins
   * @param {array} plugins the plugins
   * @param {object} [reducers] other reducers
   * @returns {function} a reducer made from the plugins' reducers and the reducers passed as 2nd parameter
   */
  combineReducers: (plugins, reducers) => {
    const pluginsReducers = getReducers(plugins);
    return combineReducers(assign({}, reducers, pluginsReducers));
  },

  mapPluginsPosition: (pluginsConfig = []) => {
    let plugins = pluginsConfig.reduce((o, p) => {
      const position = (p.cfg && p.cfg.containerPosition) || "bodyPlugins";
      return {
        ...o,
        [position]: o[position] ? [...o[position], p] : [p]
      };
    }, {});
    return plugins;
  },

  getPlugins: plugins => {
    console.log(plugins);
    return Object.keys(plugins)
      .map(name => plugins[name])
      .reduce(
        (previous, current) =>
          assign({}, previous, omit(["reducers", "sagas"], current)),
        {}
      );
  },

  getPluginDescriptor: (plugins, pluginsConfig, pluginDef) => {
    const name = is(Object, pluginDef) ? pluginDef.name : pluginDef;
    const id = is(Object, pluginDef) ? pluginDef.id : null;
    const pluginKey =
      (is(Object, pluginDef) ? pluginDef.name : pluginDef) + "Plugin";
    const impl = plugins[pluginKey];

    return {
      id: id || name,
      name,
      impl,
      cfg: impl.cfg || {},
      items: []
    };
  }
};

export default PluginsUtils;
