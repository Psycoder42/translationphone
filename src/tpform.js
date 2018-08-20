import React, { Component } from 'react';
import { connect } from 'react-redux';

// Represents the form for requesting translations
class TPForm extends Component {
  // Initialize the class and the local state and perform the necessary binds
  constructor(props) {
    super(props);
    this.state = {
      translationPending: false
    }
    this.finishedLoding = this.finishedLoding.bind(this);
    this.submitForTransltion = this.submitForTransltion.bind(this);
  }
  // Reset the form after a translation call returns
  finishedLoding(success) {
    if (success) {
      this.refs.phrase.value = '';
      this.refs.hops.value = 3;
    }
    this.setState({ translationPending: false });
  }
  // Submit the form to the translation API
  submitForTransltion(event) {
    event.preventDefault();
    this.setState({ translationPending: true });
    this.props.getTranslations(
      this.refs.phrase.value,
      parseInt(this.refs.hops.value),
      this.finishedLoding
    )
  }
  // Render the component
  render() {
    // Create the errorText JSX (or not) based on the presense of an error message
    let errorText = null;
    if (this.props.errorMsg) {
      errorText = <div className="error-message">
        {this.props.errorMsg}
      </div>
    }
    // Set the button class to include is-loading if the user sent a request and is waiting for the result
    let buttonClass = "button is-link" + (this.state.translationPending ? " is-loading" : "");
    // Return the form HTML
    return <form onSubmit={this.submitForTransltion}>
      <div className="columns">
        <div className="field column">
          <label htmlFor="phrase" className="label">Starting Phrase (max. 50 chars)</label>
          <div className="control">
            <input className="input" type="text" id="phrase" ref="phrase"
              placeholder="Text input" maxLength="50" disabled={this.state.translationPending} required/>
          </div>
        </div>
        <div className="field column is-narrow">
          <label htmlFor="hops" className="label">Hops</label>
          <div className="control">
            <div className="select">
              <select ref="hops" disabled={this.state.translationPending}>
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
      {errorText}
    </form>
  }
}

// For getting values out of the state
const mapStateToProps = function(state) {
  // Make sure to map the state that we care about
  return {
    errorMsg: state.get('errorMessage')
  }
}

// For manipulating the state
const mapDispatchToProps = function(dispatch) {
  return {
    // Responsible for making the request to the server and setting the state
    // correctly based on the success or failure of the call
    getTranslations: function(userText, numHops, callback) {
      dispatch({ type:'REMOVE_ERROR_MSG' });
      fetch('/say', {
        body: JSON.stringify({text: userText, hops: numHops}),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        // Include the http status with the result body
        return res.json().then(body => ({ status: res.status, body: body }));
      }).then(data => {
        if (data.status == 200) {
          // Everything is fine. The body is our object
          callback(true);
          dispatch({
            type:'ADD_CHAIN',
            chain: data.body
          });
        } else {
          // Something went wrong. The body has an error message in it.
          callback(false);
          dispatch({
            type:'SET_ERROR_MSG',
            errorMessage: data.body.message
          });
        }
      })
    }
  };
}

// Connect to the store to access the state
const ConnectedTPForm = connect(mapStateToProps, mapDispatchToProps)(TPForm);

// Export this component
export { ConnectedTPForm as TPForm };
