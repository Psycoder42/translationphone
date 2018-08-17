import React, { Component } from 'react';
import { connect } from 'react-redux';

class TPButton extends Component {
  render() {
    return <button onClick={this.props.addString}>Push Me</button>
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    addString: function() {
      dispatch({
        type:'ADD_CHAIN',
        chain: "Some Text"
      });
    }
  }
}

const ConnectedTPButton = connect(null, mapDispatchToProps)(TPButton);

export { ConnectedTPButton as TPButton };
