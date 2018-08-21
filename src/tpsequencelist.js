import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPSequence } from './tpsequence.js';
import { TPSavedSequence } from './tpsavedsequence.js';

// Represents the list of all of the translation chains
class TPSequenceList extends Component {
  render() {
    if (this.props.viewingSaved) {
      return <div className="sequence-list">
        {
          this.props.results.length==0
          ?
            <span className="no-results">No Results Found</span>
          :
            this.props.results.map((result, index) => {
              return <TPSavedSequence key={index} resultIdx={index}/>
            })
        }
      </div>
    } else {
      return <div className="sequence-list">
        {
          this.props.chains.map((chain, index) => {
            return <TPSequence key={index} chainIdx={index}/>
          })
        }
      </div>
    }
  }
}

// For getting values out of the state
const mapStateToProps = function(state) {
  // Make sure to map the state that we care about
  return {
    chains: state.get('chains'),
    results: state.get('query_results'),
    viewingSaved: state.get('viewingSaved')
  }
}

// Connect to the store to access the state
const ConnectedTPSequenceList = connect(mapStateToProps)(TPSequenceList);

// Export this component
export { ConnectedTPSequenceList as TPSequenceList };
