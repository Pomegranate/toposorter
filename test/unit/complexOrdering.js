/**
 * @file correctOrder
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-topo
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const tap = require('tap');
const topo = require('../../index');
const complex = require('../mocks/complexOrdering')
const buildPlugins = require('../helpers/BuildPluginArray')
const plugins = buildPlugins(complex)

/**
 *
 * @module correctOrder
 */

tap.test('Plugins return ordered correctly by their expressed dependencies', function(t){
  var sorted = topo(plugins)
  var expected = ['Env', 'SequelizePg', 'Models', 'Controllers', 'Passport', 'PreMiddleware', 'Router', 'PostMiddleware']

  t.plan(1 + expected.length)

  t.type(sorted, 'Array')

  sorted.forEach(function(v,k){
    t.same(v.configName, expected[k], v.configName + ' - Should match expected order ' + expected[k])
  })

})