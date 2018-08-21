import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPHop } from './tphop.js';
import { SVGArrow } from './svgarrow.js';

// Represents the full translation chain of a phrase
class TPSavedSequence extends Component {
  // Initialize the class and perform the necessary binds
  constructor(props) {
    super(props);ending: false
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.deleteChain = this.deleteChain.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }
  // Delete this chain from the state
  deleteChain() {
    this.props.removeChain(
      this.props.results[this.props.resultIdx]["id"],
      this.props.refreshResults,
      this.props.resultsPerPage,
      this.props.pageNumber
    );
  }
  // Like this chain
  like() {
    this.props.likeChain(
      this.props.results[this.props.resultIdx]["id"],
      this.props.refreshResults,
      this.props.resultsPerPage,
      this.props.pageNumber
    );
  }
  // Dislike this chain
  dislike() {
    this.props.dislikeChain(
      this.props.results[this.props.resultIdx]["id"],
      this.props.refreshResults,
      this.props.resultsPerPage,
      this.props.pageNumber
    );
  }
  // Expand or collapse this chain
  toggleDetails() {
    this.props.toggleExpanded(
      this.props.resultIdx,
      !this.props.expanded[this.props.resultIdx]
    )
  }
  // Render this component
  render() {
    // Init some variable to use later
    let toggleText = null;
    let content = null;
    let classes = "sequence"
    let result = this.props.results[this.props.resultIdx];
    let chain = result["chain"];
    // Determine what the sequence should look like
    if (this.props.expanded[this.props.resultIdx]) {
        // Expanded so show the details of all the hops
        toggleText = '-'
        content = <div>
          {
            chain.map((hop, index) => {
              return <TPHop key={index} hopInfo={hop}/>
            })
          }
        </div>
    } else {
      // Only show the summary view of the chain
      toggleText = '+'
      classes += " summary";
      content = <div>
        <div className="start-and-end">
          <span className="text start">{chain[0]["text"]}</span>
          <SVGArrow/>
          <span className="text end">{chain[chain.length-1]["text"]}</span>
        </div>
        <div className="chain-path">
          {
            chain.map((hop, index) => {
              return <span key={index} className="path-lang">{hop["language"]}</span>
            })
          }
        </div>
      </div>
    }
    // Return the sequence with the correct contents
    return <div className={classes}>
      <button className="toggle" onClick={this.toggleDetails}>{toggleText}</button>
      {content}
      <div className="chain-footer">
        <button className="remove-link" onClick={this.deleteChain}>[delete]</button>
        <div className="like-buttons">
          <img className="like-button" src="/images/like.png" title="Like" onClick={this.like}/>
          <span className="like-count likes">{result["likes"]}</span>
          <img className="dislike-button" src="/images/dislike.png" title="Dislike" onClick={this.dislike}/>
          <span className="like-count dislikes">{result["dislikes"]}</span>
        </div>
        <div className="credit">
          Powered by&nbsp;<a href="http://translate.yandex.com/" target="_blank">Yandex.Translate</a>
        </div>
      </div>
    </div>
  }
}

// For getting values out of the state
const mapStateToProps = function(state) {
  // Make sure to map the state that we care about
  return {
    results: state.get('query_results'),
    expanded: state.get('result_expanded'),
    resultsPerPage: state.get('resultsPerPage'),
    pageNumber: state.get('pageNumber')
  }
}

// For manipulating the state
const mapDispatchToProps = function(dispatch) {
  return {
    toggleExpanded: function(index, isExpanded) {
      dispatch({
        type: 'SET_RESULT_EXPAND',
        index: index,
        expanded: isExpanded
      });
    },
    removeChain: function(id, callback, limit, page) {
      fetch(`/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*'
        }
      }).then(res => {
        if (res.status == 200) {
          // Chain was deleted, refetch the results
          callback(limit, page);
        } else {
          console.log("Failed to delete chain");
        }
      });
    },
    likeChain: function(id, callback, limit, page) {
      fetch(`/like/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json, text/plain, */*'
        }
      }).then(res => {
        if (res.status == 200) {
          // Chain was deleted, refetch the results
          callback(limit, page);
        } else {
          console.log("Failed to like chain");
        }
      });
    },
    dislikeChain: function(id, callback, limit, page) {
      fetch(`/dislike/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json, text/plain, */*'
        }
      }).then(res => {
        if (res.status == 200) {
          // Chain was deleted, refetch the results
          callback(limit, page);
        } else {
          console.log("Failed to like chain");
        }
      });
    },
    refreshResults: function(limit, page) {
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
const ConnectedTPSavedSequence = connect(mapStateToProps, mapDispatchToProps)(TPSavedSequence);

// Export this component
export { ConnectedTPSavedSequence as TPSavedSequence };
