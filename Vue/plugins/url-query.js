import URLSearchParams from '@ungap/url-search-params';

/**
 * URLSearchParams 获取链接上的查询参数
 * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 */
const URLSearchParamsPlugin = {
  install(Vue, search = location.search) {
    Vue.prototype.$query = new URLSearchParams(search);
  },
};
export default URLSearchParamsPlugin;
