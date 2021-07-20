/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    /* istanbul ignore if */

    // 确保只安装一次
    if (plugin.installed) {
      return
    }
    // additional parameters

    // 获取所有的参数，并把Vue塞进第一个参数里
    const args = toArray(arguments, 1)
    args.unshift(this)

    // 处理传入参数是函数和对象两种格式
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else {
      plugin.apply(null, args)
    }

    // 添加安装后的标记
    plugin.installed = true
    return this
  }
}
