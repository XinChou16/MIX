export default function installModules(store, rootState, path, module) {
  const isRoot = !!path.length;
  const { mutations, actions, getters, state, modules } = module;

  if (isRoot) {
    const parentState = rootState;
    const moduleName = path[path.length - 1];

    Vue.set(parentState, moduleName, state || {});
  }

  if (mutations) {
    Object.keys(mutations).forEach(function mutationIterator(type) {
      registerMutations(store, type, mutations[type], path);
    });
  }

  if (actions) {
    Object.keys(actions).forEach(function actionIterator(type) {
      registerActions(store, type, actions[type], path);
    });
  }

  if (getters) {
    wrapGetters(store, getters, path);
  }

  // 安装子模块
  if (modules) {
    Object.keys(modules).forEach(key => {
      installModules(store, rootState, path.concat(key), modules[key]);
    });
  }

}

function registerMutations(store, type, handler, path) {
  const entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrapperedMutationHandler(payload) {
    return handler(
      getNestedState(store.state, path),
      payload
    );
  });
}

function registerActions(store, type, handler, path) {
  const entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var result = handler(
      {
        state: getNestedState(store.state, path), // local state
        rootState: store.state, // root state
        getters: store.getters, // getters
        commit: store.commit,
        dispatch: store.dispatch,
      },
      payload
    );

    if (!isPromise(result)) {
      return Promise.resolve(result);
    }

    return result;
  });
}

function wrapGetters(store, moduleGetters, path) {
  Object.keys(moduleGetters).forEach((getterKey) => {
    const rawGetter = moduleGetters[getterKey];

    store._wrappedGetters[getterKey] = function wrappedGetter(store) {
      return rawGetter(
        getNestedState(store.state, path), // local state
        store.getters, // getters
        store.state // root state
      );
    };
  });
}

// utils
function isPromise(val) {
  return val && typeof val.then === 'function';
}

function getNestedState(state, path) {
  return path.length > 0
    ? path.reduce((state, key) => state[key], state)
    : state;
}
