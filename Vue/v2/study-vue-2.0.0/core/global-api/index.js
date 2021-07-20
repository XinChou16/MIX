/* @flow */

import config from '../config'
import * as util from '../util/index'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import builtInComponents from '../components/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  // 全局配置只能读取，不能覆盖
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      util.warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // 暴露出去的一些方法，使用内部封装的方法
  Vue.util = util
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = util.nextTick

  // 初始化选项对象
  // 如：components: {}, directives: {}, filters: {}
  Vue.options = Object.create(null)
  config._assetTypes.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // 初始化内部组件，如: keep-alive, transition
  util.extend(Vue.options.components, builtInComponents)

  // 初始化 Vue.use()
  initUse(Vue)
  // 初始化 Vue.mixin()
  initMixin(Vue)
  // 初始化 Vue.extend()
  initExtend(Vue)
  // 初始化 Vue.component(), Vue.
  initAssetRegisters(Vue)
}
