import React, { Component } from 'react';

class TPHop extends Component {
  render() {
    return <div className="hop">
      <span className="hop-text">{this.props.hopInfo["text"]}</span>
      [<span className="hop-lang-name">{this.props.hopInfo["language_name"]}</span>
      <span className="hop-lang">({this.props.hopInfo["language"]})</span>]
    </div>
  }
}

export { TPHop };
