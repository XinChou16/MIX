/**
 * SDK 插件方法
 * https://github.dev/vuejs/vue/blob/dev/README.md
 */
import SDK from './instance/';
import { initGlobalAPI } from './global-api/';

initGlobalAPI(SDK);

SDK.version = '1.0.0';

export default SDK;
