import config from './config'
import { initGlobalAPI } from './global-api/index'
import Vue from './instance/index'

/**
 * 初始化全局API，如 Vue.component()， Vue.extend() 方法
 */
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: () => config._isServer
})

/* 版本 */
Vue.version = '2.0.0'

export default Vue
