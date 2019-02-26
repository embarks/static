import createMachine from './state';
import notes from './notes';
import home from './home';
import storage from '../storage';
import throttle from 'lodash/throttle';

const defaultState = {
  notes: {
    todos: []
  },
  home: {}
};

const persistedState = storage.loadState();

const machine = createMachine({ notes, home }, persistedState);

const persistNotes = () => {
  try {
    storage.saveState({
      notes: machine.getState().notes,
      home: machine.getState().home
    });
  } catch(error) {
    console.error('Failed to save state to localStorage', error);
  }
};

machine.listen(throttle(persistNotes, 1000));

const root = (state = {}, action) => {
  let newState = state;
  try {
    machine.dispatch(state, action);
    newState = machine.getState();
  } catch(error) {
    console.error(`Failed to dispatch ${action.type}`, error);
  }
  return newState;
};
export default { 
  root,
  initialState: { 
    ...defaultState,
    ...machine.getState()
  }
};