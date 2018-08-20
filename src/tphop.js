import React, { Component } from 'react';

// Represents one translation result
class TPHop extends Component {
  render() {
    return <div className="hop">
      <span className="hop-text">{this.props.hopInfo["text"]}</span>
      <div>
        <span className="hop-lang-name">{this.props.hopInfo["language_name"]}</span>
        &nbsp;<span className="hop-lang">({this.props.hopInfo["language"]})</span>
      </div>
    </div>
  }
}

// Export this component
export { TPHop };
