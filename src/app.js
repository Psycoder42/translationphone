import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { TPSequence } from './tpsequence.js';
import { TPButton } from './tpbutton.js';
import store from './store.js';

// To run after page loads
const runOnReady = () => {
  // Bind the react content into the index.html
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <div>
          <TPButton/>
          <TPSequence/>
        </div>
      </Provider>
    </div>,
    document.querySelector('.container')
  );
}

// Run when the page is done loading
document.addEventListener("DOMContentLoaded", runOnReady);
