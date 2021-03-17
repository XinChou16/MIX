/**
 * 给任意元素添加`<a>` 链接效果
 * 该指令适合在某些场景下临时使用
 * @modifer blank - 是否打开新的窗口
 */
export const link = {
  bind(el, binding) {
    el.dataset.href = binding.value;

    el.style.cursor = 'pointer';
    el.__hrefHandler = () => {
      if (binding.modifiers.blank) {
        window.open(el.dataset.href);
      } else {
        const replace = binding.modifiers.replace;
        window.location[replace ? 'replace' : 'assign'](el.dataset.href);
      }
    };

    el.addEventListener('click', el.__hrefHandler);
  },
  update(el, binding) {
    el.dataset.href = binding.value;
  },
  unbind(el) {
    el.removeEventListener('click', el.__hrefHandler);
    delete el.__hrefHandler;
  }
};

/**
 * 给任意元素添加 `<router-link>` 的 `to` 效果
 */
export const to = {
  bind(el, binding, vnode) {
    el.dataset.to = binding.value;

    const $router = vnode.componentInstance.$router;
    if (!$router) {
      return console.warn('cannot find vue router instance');
    }

    el.__toHandler = () => {
      $router[binding.modifiers.replace ? 'replace' : 'push'](el.dataset.to);
    };

    el.addEventListener('click', el.__toHandler);
  },
  update(el, binding) {
    el.dataset.to = binding.value;
  },
  unbind(el) {
    el.removeEventListener('click', el.__toHandler);
    delete el.__toHandler;
  }
};
