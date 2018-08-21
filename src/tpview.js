import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPSequenceList } from './tpsequencelist.js';
import { TPForm } from './tpform.js';

// Represents the visible content on the page
class TPView extends Component {
  constructor(props) {
    super(props);
    this.lastPage = this.lastPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.setPageSize = this.setPageSize.bind(this)
    this.refreshResults = this.refreshResults.bind(this)
  }
  componentDidMount() {
    if (this.props.query_results == null) {
      this.refreshResults();
    }
  }
  // Update the results from the database
  setPageSize() {
    let newSize = this.refs.pageSize.value;
    this.props.changePageSize(
      newSize
    );
    this.props.loadResults(
      newSize,
      this.props.pageNumber
    );
  }
  // Update the results from the database
  lastPage() {
    let newPage = this.props.pageNumber-1;
    this.props.lastPage();
    this.props.loadResults(
      this.props.resultsPerPage,
      newPage
    );
  }
  // Update the results from the database
  nextPage() {
    let newPage = this.props.pageNumber+1;
    this.props.nextPage();
    this.props.loadResults(
      this.props.resultsPerPage,
      newPage
    );
  }
  // Update the results from the database
  refreshResults() {
    this.props.loadResults(
      this.props.resultsPerPage,
      this.props.pageNumber
    );
  }
  render() {
    let form = <TPForm/>
    let pageControls = null
    let buttonText = "See Saved Translations"
    if (this.props.viewingSaved) {
      form = null
      buttonText = "Create A Translation"
      // Determine what the previous button should be
      let prevButton = <button className="last-page" onClick={this.lastPage}>Previous</button>
      if (this.props.pageNumber == 1) {
        prevButton = <button className="last-page disabled" >Previous</button>
      }
      // Determine what the next button should be
      let nextButton = <button className="next-page" onClick={this.nextPage}>Next</button>
      if (this.props.resultsPerPage > this.props.query_results.length) {
        nextButton = <button className="next-page disabled" >Next</button>
      }
      // The paging controls
      pageControls = <div className="columns result-nav">
        <div className="column page-controls">
          {prevButton}
          <span className="cur-page-num">{this.props.pageNumber}</span>
          {nextButton}
        </div>
        <div className="column page-controls">
          <button className="refresh-button" onClick={this.refreshResults}>Refresh Page</button>
        </div>
        <div className="column page-controls">
          <div className="select is-small">
            <select ref="pageSize" defaultValue={this.props.resultsPerPage} onChange={this.setPageSize}>
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </div>
        </div>
      </div>
    }
    return <div className="main-view">
      <button className="toggle-view" onClick={this.props.toggleView}>{buttonText}</button>
      {form}
      {pageControls}
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
    lastPage: function() {
      dispatch({
        type:'LAST_PAGE'
      });
    },
    nextPage: function() {
      dispatch({
        type:'NEXT_PAGE'
      });
    },
    changePageSize: function(size) {
      dispatch({
        type:'SET_RESULT_COUNT',
        resultsPerPage: size
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
