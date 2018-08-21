import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPSequenceList } from './tpsequencelist.js';
import { TPForm } from './tpform.js';

// Represents the visible content on the page
class TPView extends Component {
  componentDidMount() {
    if (this.props.query_results == null) {
      this.props.loadResults(
        this.props.resultsPerPage,
        this.props.pageNumber
      );
    }
  }
  render() {
    let form = <TPForm/>
    let buttonText = "See Saved Translations"
    if (this.props.viewingSaved) {
      form = null
      buttonText = "Create A Translation"
    }
    return <div className="main-view">
      <button className="toggle-view" onClick={this.props.toggleView}>{buttonText}</button>
      {form}
      <TPSequenceList/>
    </div>
  }
}

// For getting values out of the state
const mapStateToProps = function(state) {
  // Make sure to map the state that we care about
  return {
    viewingSaved: state.get('viewingSaved'),
    query_results: state.get('query_results'),
    resultsPerPage: state.get('resultsPerPage'),
    pageNumber: state.get('pageNumber')
  }
}

// For manipulating the state
const mapDispatchToProps = function(dispatch) {
  return {
    toggleView: function() {
      dispatch({
        type:'TOGGLE_VIEW'
      });
    },
    loadResults: function(limit, page) {
      fetch(`/list?n=${limit}&p=${page}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*'
        }
      }).then(res => {
        // Include the http status with the result body
        return res.json().then(body => ({ status: res.status, body: body }));
      }).then(data => {
        if (data.status == 200) {
          dispatch({
            type: 'SET_QUERY_RESULT',
            results: data.body
          });
        } else {
          console.log("Failed to retrieve saved chains");
        }
      });
    }
  }
}

// Connect to the store to access the state
const ConnectedTPView = connect(mapStateToProps, mapDispatchToProps)(TPView);

// Export this component
export { ConnectedTPView as TPView };
