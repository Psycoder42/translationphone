import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPSequence } from './tpsequence.js';

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

const mapStateToProps = function(state) {
  // Make sure to map the state that we care about
  return {
    chains: state.get('chains')
  }
}

const ConnectedTPSequenceList = connect(mapStateToProps)(TPSequenceList);

export { ConnectedTPSequenceList as TPSequenceList };
