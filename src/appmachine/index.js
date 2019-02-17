import createMachine from './state';
import notes from './notes';
import storage from '../storage';
import throttle from 'lodash/throttle';

const persistedState = storage.loadState();

const machine = createMachine({ notes }, persistedState);

const persistNotes = () => {
  try {
    storage.saveState({
      notes: machine.getState().notes
    });
  } catch(error) {
    console.error('Failed to save state to localStorage', error);
  }
};

machine.listen(throttle(persistNotes, 1000));

const root = (state, action) => {
  try { 
    machine.dispatch(state, action);
  } catch(error) {
    console.error(`Failed to dispatch ${action.type}`, error);
  }
  return machine.getState();
};

export default { 
  root,
  initialState: { 
    notes: [],
    ...machine.getState()
  }
};