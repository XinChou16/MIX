/**
 * init global api
 */
import { initUse } from './use';
import config from '../config';
import { log, warn } from '../util';

export function initGlobalAPI(SDK) {
  // expose config
  const configDef = {};
  configDef.get = () => config;

  Object.defineProperty(SDK, 'config', configDef);

  // expose util
  SDK.util = {
    log,
    warn
  };

  // options
  SDK.options = Object.create(null);

  // expose use
  initUse(SDK);
}
