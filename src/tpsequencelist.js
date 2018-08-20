import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPSequence } from './tpsequence.js';

// Represents the list of all of the translation chains
class TPSequenceList extends Component {
  render() {
    return <div className="sequence-list">
      {
        this.props.chains.map((hop, index) => {
          return <TPSequence key={index} chainIdx={index}/>
        })
      }
    </div>
  }
}

// For getting values out of the state
const mapStateToProps = function(state) {
  // Make sure to map the state that we care about
  return {
    chains: state.get('chains')
  }
}

// Connect to the store to access the state
const ConnectedTPSequenceList = connect(mapStateToProps)(TPSequenceList);

// Export this component
export { ConnectedTPSequenceList as TPSequenceList };
