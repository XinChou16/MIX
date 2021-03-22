/**
 * `v-ellipsis-title`
 * 给超出部分的文字，显示 titel属性，省略号
 */
export default {
  bind(el, binding) {
    el.__ellipsisTitleHandler = () => {
      // get el style obj
      const style = window.getComputedStyle(el);
      const title = binding.value || el.innerText;

      // check sis match ellipsis condition
      if (
        style.overflow === 'hidden' &&
        style.textOverflow === 'ellipsis' &&
        style.whiteSpace === 'noWrap' &&
        el.scrollWidth > el.offsetWidth
      ) {
        el.setAttribute('title', title);
      }
    };

    // listen mouse event
    el.addEventListener('mouseenter', el.__ellipsisTitleHandler);
  },
  unbind(el) {
    el.removeEventListener('mouseenter', el.__ellipsisTitleHandler);
    delete el.__ellipsisTitleHandler;
  }
}
