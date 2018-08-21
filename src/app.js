import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { TPView } from './tpview.js';
import store from './store.js';

// To run after page loads
const runOnReady = () => {
  // Bind the react content into the index.html
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <main>
          <h1 className="title">~ Translation Phone ~</h1>
          <h3 className="subtitle">in one language and out the other</h3>
          <TPView/>
        </main>
      </Provider>
    </div>,
    document.querySelector('.container')
  );
}

// Run when the page is done loading
document.addEventListener("DOMContentLoaded", runOnReady);
