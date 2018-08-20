import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPHop } from './tphop.js';
import { SVGArrow } from './svgarrow.js';

class TPSequence extends Component {
  constructor(props) {
    super(props);ending: false
    this.deleteChain = this.deleteChain.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }
  deleteChain() {
    this.props.removeChain(
      this.props.chainIdx
    )
  }
  toggleDetails() {
    this.props.toggleExpanded(
      this.props.chainIdx,
      !this.props.expanded[this.props.chainIdx]
    )
  }
  render() {
    let toggleText = null;
    let content = null;
    let classes = "sequence"
    let chain = this.props.chains[this.props.chainIdx];
    // Determin what the sequence should look like
    if (this.props.expanded[this.props.chainIdx]) {
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
        <button className="remove-link" onClick={this.deleteChain}>[remove]</button>
        <div className="credit">
          Powered by&nbsp;<a href="http://translate.yandex.com/" target="_blank">Yandex.Translate</a>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = function(state) {
  // Make sure to map the state that we care about
  return {
    chains: state.get('chains'),
    expanded: state.get('expanded')
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    toggleExpanded: function(index, isExpanded) {
      dispatch({
        type:'SET_EXPAND',
        index: index,
        expanded: isExpanded
      });
    },
    removeChain: function(index) {
      dispatch({
        type:'REMOVE_CHAIN',
        index: index
      });
    }
  }
}

const ConnectedTPSequence = connect(mapStateToProps, mapDispatchToProps)(TPSequence);

export { ConnectedTPSequence as TPSequence };
