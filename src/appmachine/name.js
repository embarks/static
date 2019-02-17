export function add(name) {
  return {
    type: 'add name',
    name
  };
}

function nameReducer(state, action) {
  switch (action.type) {
  case 'add name':
    return { name: action.name };
  default:
    throw new Error('No action type provided to nameReducer');
  }
}

export default nameReducer;