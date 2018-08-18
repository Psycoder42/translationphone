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
      fetch('/say', {
        body: JSON.stringify({text: 'fat dumb and happy', hops: 3}),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {
        console.log(data);
        dispatch({
          type:'ADD_CHAIN',
          chain: "Some Text"
        });
      });
    }
  }
}

const ConnectedTPButton = connect(null, mapDispatchToProps)(TPButton);

export { ConnectedTPButton as TPButton };
