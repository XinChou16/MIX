import config from '../config';

export function log(msg) {
  console.log(msg);
}

export function handleError(err) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err);
    } catch (e) {

    }
  }
  console.error(`[SDK ERROR]: \n`, error);
}

export function warn(msg) {
  if (config.warnHandler) {
    try {
      return config.warnHandler.call(null, msg);
    } catch (e) {

    }
  }
  console.warn(`[SDK WARN]: \n`, msg);
}

export function invokeWithErrorHandling(handler, ctx, args) {
  try {
    return handler.apply(ctx, args);
  } catch (e) {
    handleError(e);
  }
}
