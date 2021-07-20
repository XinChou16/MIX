/* @flow */

import config from '../config'
import { warn, isPlainObject } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // 组件选项类型：三种[component, filter, directive]
  config._assetTypes.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      /**
       * Vue.filter('upper'), -> this.options.filters.upper
       * Vue.filter('upper', () => {}), -> this.options.filters.upper
       *
      */
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */

        // 如果是组件选项，则判断组件名是否是保留标签名称
        // isReservedTag目前在配置里是始终返回 false, 在哪覆盖的，后续再补充上@todo
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            )
          }
        }

        // 如果当前为组件，且传入的选项为对象，则根据名称来注册
        // 创建组件，从根组件继承过来的一个实例
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = Vue.extend(definition)
        }

        // 如果是指令，且为函数，则将该方法，作为 bind, update的回调
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }

        this.options[type + 's'][id] = definition


        return definition
      }
    }
  })
}
