/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Topological
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _ = require('lodash')
const _fp = require('lodash/fp')
/**
 *
 * @module index
 */

const topo = require('./lib/topo')

/**
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */

module.exports = function magnumTopo(pluginArray){
  let Sort = new topo()

  // let derivedPlugins = _fp.map((p) => {
  //   return p.getSortProperties()
  // }, pluginArray)
  //
  // console.log(derivedPlugins);

  let groupedParams = _.chain(pluginArray)
    .map(function(plugin) {

      let p = plugin.getSortProperties()
      if(p.paramName){
        return {paramName: p.paramName, configName: p.configName}
      }
      return false
    })
    .filter(Boolean)
    .groupBy('paramName')
    .value()

  _.each(pluginArray, function(o) {
    let plugin = o.getSortProperties()
    // Map dependencies, if there are multiple matching, return the full array
    // and flatten at the end of the chain. This Accounts for merge plugins that
    // all export the same paramName for use.
    var deps = _.isArray(plugin.depends) ? plugin.depends : _.isUndefined(plugin.depends) ? [] : [plugin.depends]
    var pluginsRequiredDependencies = _.chain(deps).map(function(d) {

      if(_.isArray(groupedParams[d])){
        return _.map(groupedParams[d], function(p){
          return p.configName
        })
      }
      return d
    }).flatten().value()

    // Same as pluginRequiredDependencies.
    var opts = _.isArray(plugin.optional) ? plugin.optional : _.isUndefined(plugin.optional) ? [] : [plugin.optional]
    var pluginsOptionalDependencies = _.chain(opts).map(function(d) {

      if(_.isArray(groupedParams[d])){
        return _.map(groupedParams[d], function(p){
          return p.configName
        })
      }
      return d
    }).flatten().value()

    Sort.add(plugin.configName, pluginsRequiredDependencies)
    Sort.add(plugin.configName, pluginsOptionalDependencies)


    // Automatically add plugins paramName, if it differs from the
    // configName of the plugin. this allows downstream plugins to sak for dependencies
    // by configName, moduleName, or exported parameter.
    if(plugin.provides) {
      var provides = _.isArray(plugin.provides) ? plugin.provides : [plugin.provides]
      _.each(provides, function(p) {
        if(p !== plugin.configName){
          Sort.add(p, plugin.configName)
        }
      })
    }
  })

  var Sorted = Sort.sort().reverse()
  var KeyedPlugins = _.keyBy(pluginArray, 'configName')

  return _.chain(Sorted)
    .map(function(key){
      var byPluginName = KeyedPlugins[key]
      return byPluginName
    })
    .filter(_.isObject)
    .value()

}
