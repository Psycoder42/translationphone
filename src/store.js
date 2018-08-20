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
  let updatedChains = null;
  let updatedExpanded = null;
  // Now perform the requested action
  switch(action.type) {
    case 'ADD_CHAIN':
      // Set the chains array to the existing chains plus the new one
      updatedChains = [action.chain, ...state.get('chains')];
      // Add a new expanded boolean to the expanded list
      updatedExpanded = [false, ...state.get('expanded')];
      // Also clear the error message
      return state.withMutations(function(mutatable) {
        mutatable.set('errorMessage', null);
        mutatable.set('chains', updatedChains);
        mutatable.set('expanded', updatedExpanded);
      });
    case 'REMOVE_CHAIN':
      // Remove the appropriate chain from the chains array
      updatedChains = [
        ...state.get('chains').slice(0, action.index),
        ...state.get('chains').slice(action.index+1)
      ];
      // Remove the appropriate expanded boolean from the expanded list
      updatedExpanded = [
        ...state.get('expanded').slice(0, action.index),
        ...state.get('expanded').slice(action.index+1)
      ];
      // Also clear the error message
      return state.withMutations(function(mutatable) {
        mutatable.set('errorMessage', null);
        mutatable.set('chains', updatedChains);
        mutatable.set('expanded', updatedExpanded);
      });
    case 'REMOVE_ERROR_MSG':
      // Set an error messages
      return state.set('errorMessage', null);
    case 'SET_ERROR_MSG':
      // Set an error messages
      return state.set('errorMessage', action.errorMessage);
    case 'SET_EXPAND':
      // Update the particular expanded index with the new value
      updatedExpanded = [
        ...state.get('expanded').slice(0, action.index),
        action.expanded,
        ...state.get('expanded').slice(action.index+1)
      ];
      // Also clear the error message
      return state.withMutations(function(mutatable) {
        mutatable.set('errorMessage', null);
        mutatable.set('expanded', updatedExpanded);
      });
    default:
      // Return the unmodified state for unknown action types
      return state;
  }
}

let store = createStore(stateReducer);

export default store;
