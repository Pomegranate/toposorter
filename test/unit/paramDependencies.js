/**
 * @file paramDependencies
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-topo
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

const tap = require('tap');
const topo = require('../../index');
const provides = require('../mocks/paramDependencies')
const buildPlugins = require('../helpers/BuildPluginArray')
const plugins = buildPlugins(provides)

/**
 *
 * @module paramDependencies
 */

tap.test('Plugins return ordered correctly by injectable param name', function(t){

  let sorted = topo(plugins)
  let expected = [
    'ApplicationEnv',
    'Middleware',
    'Middleware2',
    'Middleware3',
    'TestParam' ,
    'SequelizePg',
    'Router',
    'ApplicationServer'
  ]
  t.plan(1 + expected.length)

  t.type(sorted, 'Array')
  sorted.forEach(function(v,k){
    console.log(v.configName);
    t.same(v.configName, expected[k], v.configName + ' - Should match expected order ' + expected[k])
  })
})