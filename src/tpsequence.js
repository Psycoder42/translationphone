import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPHop } from './tphop.js';

class TPSequence extends Component {
  render() {
    return <div className="tp-sequence">
      {
        this.props.chain.map((hop, index) => {
          return <TPHop key={index} text={hop}/>
        })
      }
    </div>
  }
}

const mapStateToProps = function(state) {
  // Make sure to map the state that we care about
  return {
    chain: state.get('chains')
  }
}

const ConnectedTPSequence = connect(mapStateToProps)(TPSequence);

export { ConnectedTPSequence as TPSequence };
