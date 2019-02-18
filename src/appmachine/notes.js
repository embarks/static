import v4 from 'uuid/v4';

export function add(note) {
  return {
    type: 'add note',
    note
  };
}

export function remove(note) {
  return {
    type: 'remove note',
    NoteID: note.NoteID
  };
}

export function clear() {
  return {
    type: 'clear notes'
  };
}

function notesReducer(state, action) {
  switch (action.type) {
  case 'add note':
    return { notes: state.notes.concat({ NoteID: v4(), note: action.note }) };
  case 'remove note':
    return { notes: state.notes.filter(({ NoteID }) => NoteID !== action.NoteID) };
  case 'clear notes': 
    return { notes: [] };
  default:
    throw new Error('No action type provided to notesReducer');
  }
}

export default notesReducer;