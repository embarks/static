export function setName(newName) {
  return {
    type: 'change name',
    newName
  };
}

function homeReducer(state, action) {
  switch (action.type) {
  case 'change name':
    return Object.assign({}, state, { name: action.newName });
  default:
    return state;
  }
}

export default homeReducer;