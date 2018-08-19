import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPHop } from './tphop.js';

class TPSequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryView: true
    };
    this.toggleView = this.toggleView.bind(this);
  }
  toggleView() {
    this.setState({ summaryView: !this.state.summaryView })
  }
  render() {
    let chain = this.props.chains[this.props.chainIdx];
    if (this.state.summaryView) {
      // Only show the summary view of the chain
      return <div className="sequence summary" onClick={this.toggleView}>
        <div className="start-and-end">
          <span className="text start">{chain[0]["text"]}</span>
          <span className="text arrow">--></span>
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
    // Not a summary so show the details of all the hops
    return <div className="sequence" onClick={this.toggleView}>
      {
        chain.map((hop, index) => {
          return <TPHop key={index} hopInfo={hop}/>
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

const ConnectedTPSequence = connect(mapStateToProps)(TPSequence);

export { ConnectedTPSequence as TPSequence };
