import { createStore } from 'redux'
import { Map, List } from 'immutable'

// The initial (empty) state object
const defaultState = Map({
  chains: [],
  expanded: [],
  wasSaved: [],
  result_expanded: [],
  query_results: null,
  errorMessage: null,
  viewingSaved: false,
  resultsPerPage: 10,
  pageNumber: 1
});

// The function that knows how each action affects the state
const stateReducer = function(state = defaultState, action) {
  // Define these at the top otherwise webpack complains about redefining them
  let updatedChains = null;
  let updatedExpanded = null;
  let updatedWasSaved = null;
  // Perform the requested action
  switch(action.type) {
    case 'ADD_CHAIN':
      // Set the chains array to the existing chains plus the new one
      updatedChains = [action.chain, ...state.get('chains')];
      // Add a new boolean to the expanded list
      updatedExpanded = [false, ...state.get('expanded')];
      // Add a new boolean to the wasSaved list
      updatedWasSaved = [false, ...state.get('wasSaved')];
      // Also clear the error message
      return state.withMutations(function(mutatable) {
        mutatable.set('errorMessage', null);
        mutatable.set('chains', updatedChains);
        mutatable.set('expanded', updatedExpanded);
        mutatable.set('wasSaved', updatedWasSaved);
      });
    case 'REMOVE_CHAIN':
      // Remove the appropriate chain from the chains array
      updatedChains = [
        ...state.get('chains').slice(0, action.index),
        ...state.get('chains').slice(action.index+1)
      ];
      // Remove the appropriate boolean from the expanded list
      updatedExpanded = [
        ...state.get('expanded').slice(0, action.index),
        ...state.get('expanded').slice(action.index+1)
      ];
      // Remove the appropriate boolean from the wasSaved list
      updatedWasSaved = [
        ...state.get('wasSaved').slice(0, action.index),
        ...state.get('wasSaved').slice(action.index+1)
      ];
      // Also clear the error message
      return state.withMutations(function(mutatable) {
        mutatable.set('errorMessage', null);
        mutatable.set('chains', updatedChains);
        mutatable.set('expanded', updatedExpanded);
        mutatable.set('wasSaved', updatedWasSaved);
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
    case 'SET_QUERY_RESULT':
      // Make a new expanded array
      updatedExpanded = new Array(action.results.length).fill(false);
      // Set the query result
      return state.withMutations(function(mutatable) {
        mutatable.set('result_expanded', updatedExpanded);
        mutatable.set('query_results', action.results);
      });
    case 'SET_RESULT_EXPAND':
      // Update the particular expanded index with the new value
      updatedExpanded = [
        ...state.get('result_expanded').slice(0, action.index),
        action.expanded,
        ...state.get('result_expanded').slice(action.index+1)
      ];
      return state.set('result_expanded', updatedExpanded);
    case 'SET_SAVED':
      // Update the particular wasSaved index with true
      updatedWasSaved = [
        ...state.get('wasSaved').slice(0, action.index),
        true,
        ...state.get('wasSaved').slice(action.index+1)
      ];
      // Also clear the error message
      return state.withMutations(function(mutatable) {
        mutatable.set('errorMessage', null);
        mutatable.set('wasSaved', updatedWasSaved);
      });
    case 'TOGGLE_VIEW':
      // Switch which view the user is looking at as well as clear the error message
      return state.withMutations(function(mutatable) {
        mutatable.set('errorMessage', null);
        mutatable.set('viewingSaved', !state.get('viewingSaved'));
      });
    case 'LAST_PAGE':
      // Switch to the previous page of results
      return state.set('pageNumber', state.get('pageNumber')-1);
    case 'NEXT_PAGE':
      // Switch to the next page of results
      return state.set('pageNumber', state.get('pageNumber')+1);
    case 'SET_RESULT_COUNT':
      // Set the number of results to return
      return state.set('resultsPerPage', action.resultsPerPage);
    default:
      // Return the unmodified state for unknown action types
      return state;
  }
}

// Create and export the store
let store = createStore(stateReducer);
export default store;
