/**
 * internal plugins
 */
import queryPlugin from './query';

export function initInternalPlugins(SDK) {
  SDK.use(queryPlugin);
}
