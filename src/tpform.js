import React, { Component } from 'react';
import { connect } from 'react-redux';

class TPForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translationPending: false
    }
    this.finishedLoding = this.finishedLoding.bind(this);
    this.submitForTransltion = this.submitForTransltion.bind(this);
  }
  finishedLoding() {
    this.setState({ translationPending: false });
  }
  submitForTransltion(event) {
    event.preventDefault();
    console.log(this.refs);
    this.setState({ translationPending: true });
    this.props.getTranslations(
      this.refs.phrase.value,
      parseInt(this.refs.hops.value),
      this.finishedLoding
    )
  }
  render() {
    let buttonClass = "button is-link" + (this.state.translationPending ? " is-loading" : "");
    return <form onSubmit={this.submitForTransltion}>
      <div className="columns">
        <div className="field column">
          <label htmlFor="phrase" className="label">Starting Phrase</label>
          <div className="control">
            <input className="input" type="text" id="phrase" ref="phrase" placeholder="Text input" required/>
          </div>
        </div>
        <div className="field column is-narrow">
          <label htmlFor="hops" className="label">Hops</label>
          <div className="control">
            <div className="select">
              <select ref="hops">
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field column is-narrow submit">
          <div className="control">
            <button className={buttonClass}>Submit</button>
          </div>
        </div>
      </div>
    </form>
  }
}

const mapDispatchFunctions = function(dispatch){
  return {
    getTranslations: function(userText, numHops, callback) {
      fetch('/say', {
        body: JSON.stringify({text: userText, hops: numHops}),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {
        callback();
        dispatch({
          type:'ADD_CHAIN',
          chain: data
        });
      });
    }
  }
}

const ConnectedTPForm = connect(null, mapDispatchFunctions)(TPForm);

export { ConnectedTPForm as TPForm };
