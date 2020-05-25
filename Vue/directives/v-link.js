export const link = {
  bind(el, binding) {
    el.dataset.href = binding.value;

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
