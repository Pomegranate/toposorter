/**
 * @file noName
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-topo
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

var tap = require('tap');
var topo = require('../../index');
var blankName = [
  {configName: '', depends: []},
]
const buildPlugins = require('../helpers/BuildPluginArray')
const plugins = buildPlugins(blankName)
/**
 *
 * @module noName
 */

tap.test('Throws on empty name string', function(t){
  t.plan(1)
  t.throws(function(){
    var s = topo(plugins)
  })
})