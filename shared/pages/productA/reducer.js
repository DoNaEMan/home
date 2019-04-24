export default function todos(state = ['How are you?\n'], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.payload]);
    default:
      return state;
  }
}
