// ultra simple state machine using hooks and context

const combination = (reducers) => {
  const keys = Object.keys(reducers);
  return function combinedReducer(state = {}, action) {
    let hasChanged = false;
    let nextState = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      nextState = reducer({ [key]: previousStateForKey }, action);
      hasChanged = hasChanged || nextState !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
};

export function machine(reducers, persisted) {
  const reducer = combination(reducers);
  let currentState = persisted;
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  function listen(listener) {
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }

    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }
    if (isDispatching) {
      throw new Error(
        'You may not call store.listen() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. '
      );
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unlisten() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. '
        );
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call machine.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      );
    }
    return currentState;
  }

  function dispatch(defaultState, action) {

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      );
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = reducer(currentState || defaultState, action);
    }
    catch(error) {
      console.error('Failed to get the new state', error);
    } 
    finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  }

  return {
    dispatch,
    listen,
    getState,
  };
}

export default machine;