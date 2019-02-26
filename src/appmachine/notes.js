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

export function changeTitle(newTitle) {
  return {
    type: 'change title',
    newTitle
  };
}


function notesReducer(state, action) {
  switch (action.type) {
  case 'add note':
    return Object.assign({}, state, { todos: state.todos.concat({ NoteID: v4(), note: action.note }) });
  case 'remove note':
    return Object.assign({}, state, { todos: state.todos.filter(({ NoteID }) => NoteID !== action.NoteID) });
  case 'clear notes': 
    return Object.assign({}, state, { todos: [] });
  case 'change title':
    return Object.assign({}, state, { title: action.newTitle });
  default:
    return state;
  }
}

export default notesReducer;