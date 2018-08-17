import { createStore } from 'redux'
import { Map, List } from 'immutable'

// The initial (empty) state object
const defaultState = Map({
  chains: []
});

// The function that knows how each action affects the state
const stateReducer = function(state = defaultState, action) {
  // Now perform the requested action
  switch(action.type) {
    case 'ADD_CHAIN':
      // Set the chains array in the state to the existing chains plus the new one
      return state.set('chains', [...state.get('chains'), action.chain])
    default:
      // Return the unmodified state for unknown action types
      return state;
  }
}

let store = createStore(stateReducer);

export default store;
