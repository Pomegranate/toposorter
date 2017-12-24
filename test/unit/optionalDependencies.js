/**
 * @file optionalDependencies
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-topo
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';



const tap = require('tap');
const topo = require('../../index');
const optional = require('../mocks/optionalDependencies');
const buildPlugins = require('../helpers/BuildPluginArray')
const plugins = buildPlugins(optional)
/**
 *
 * @module optionalDependencies
 */

tap.test('Plugins return ordered correctly by their expressed dependencies', function(t){

  let sorted = topo(plugins)
  let expected = ['Env', 'Merge', 'Passport', 'Strategy', 'Middleware', 'Routes', 'PreRouter', 'Setup']

  t.plan(1 + expected.length)

  t.type(sorted, 'Array')
  sorted.forEach(function(v,k){
    t.same(v.configName, expected[k], v.configName + ' - Should match expected order ' + expected[k])
  })
})