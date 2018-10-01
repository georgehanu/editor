import PluginsUtils from "../utils/PluginsUtils";
import DebugUtils from "../utils/DebugUtils";

export default plugins => {
  const allReducers = PluginsUtils.combineReducers(plugins, {});
  const store = DebugUtils.createDebugStore(allReducers, {});
  return store;
};
