/**
 * @file BuildPluginArray
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project toposorter
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _fp = require('lodash/fp')

/**
 *
 * @module BuildPluginArray
 */

module.exports = function(plugins){
  return _fp.map((p) => {
    let plugin = {
      configName: p.configName,
      paramName: p.paramName || false,
      depends: p.depends || [],
      provides: p.provides || [],
      optional: p.optional || []
    }

    p.depends = null
    p.provides = null
    p.optional = null
    // p.configName = null
    // p.paramName = null
    // console.log(plugin);

    p.getSortProperties = () => {
      return plugin
    }

    return p
  }, plugins)
}