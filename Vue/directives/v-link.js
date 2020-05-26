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
        location.href = el.dataset.href;
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
}
