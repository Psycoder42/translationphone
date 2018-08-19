import { createStore } from 'redux'
import { Map, List } from 'immutable'

// The initial (empty) state object
const defaultState = Map({
  chains: [],
  expanded: [],
  errorMessage: null
});

// The function that knows how each action affects the state
const stateReducer = function(state = defaultState, action) {
  // Now perform the requested action
  switch(action.type) {
    case 'ADD_CHAIN':
      // Clear any error messages
      let temp1 = state.set('errorMessage', null);
      // Set the chains array in the state to the existing chains plus the new one
      let temp2 = temp1.set('chains', [action.chain, ...state.get('chains')]);
      // Then add a new expanded boolean to the expanded list
      return temp2.set('expanded', [false, ...state.get('expanded')]);
    case 'SET_ERROR':
      // Set an error messages
      return state.set('errorMessage', action.errorMessage);
    case 'SET_EXPAND':
      // Update the particular expanded index with the new value
      let updatedExpanded = [
        ...state.get('expanded').slice(0, action.index),
        action.expanded,
        ...state.get('expanded').slice(action.index+1)
      ];
      return state.set('expanded', updatedExpanded);
    default:
      // Return the unmodified state for unknown action types
      return state;
  }
}

let store = createStore(stateReducer);

export default store;
