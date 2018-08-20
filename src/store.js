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
  let stateRef = state
  // Any action except the ERROR_MSG actions will clear the error state
  if (!action.type.match(/ERROR_MSG/)) {
    stateRef = stateReducer(state, { type: 'REMOVE_ERROR_MSG' });
  }
  // Now perform the requested action
  switch(action.type) {
    case 'ADD_CHAIN':
      // Set the chains array in the state to the existing chains plus the new one
      let ac_temp = stateRef.set('chains', [action.chain, ...stateRef.get('chains')]);
      // Then add a new expanded boolean to the expanded list
      return ac_temp.set('expanded', [false, ...stateRef.get('expanded')]);
    case 'REMOVE_CHAIN':
      // Set the chains array in the state to the existing chains plus the new one
      let rc_temp = stateRef.set('chains', [action.chain, ...stateRef.get('chains')]);
      // Then add a new expanded boolean to the expanded list
      return rc_temp.set('expanded', [false, ...stateRef.get('expanded')]);
    case 'REMOVE_ERROR_MSG':
      // Set an error messages
      return stateRef.set('errorMessage', null);
    case 'SET_ERROR_MSG':
      // Set an error messages
      return stateRef.set('errorMessage', action.errorMessage);
    case 'SET_EXPAND':
      // Update the particular expanded index with the new value
      let updatedExpanded = [
        ...stateRef.get('expanded').slice(0, action.index),
        action.expanded,
        ...stateRef.get('expanded').slice(action.index+1)
      ];
      return stateRef.set('expanded', updatedExpanded);
    default:
      // Return the unmodified state for unknown action types
      return state;
  }
}

let store = createStore(stateReducer);

export default store;
