export default function installModules(store, module) {
  const { mutations, actions, getters } = module;

  if (mutations) {
    Object.keys(mutations).forEach(function mutationIterator(type) {
      registerMutations(store, type, mutations[type]);
    });
  }

  if (actions) {
    Object.keys(actions).forEach(function actionIterator(type) {
      registerActions(store, type, actions[type]);
    });
  }

  if (getters) {
    wrapGetters(store, getters);
  }
}

function registerMutations(store, type, handler) {
  const entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrapperedMutationHandler(payload) {
    return handler(store.state, payload);
  });
}

function registerActions(store, type, handler) {
  const entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var result = handler(
      {
        state: store.state,
        getters: store.getters,
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

function wrapGetters(store, moduleGetters) {
  Object.keys(moduleGetters).forEach((getterKey) => {
    const rawGetter = moduleGetters[getterKey];

    store._wrappedGetters[getterKey] = function wrappedGetter(store) {
      return rawGetter(store.state, store.getters);
    };
  });
}

// utils
function isPromise(val) {
  return val && typeof val.then === 'function';
}
