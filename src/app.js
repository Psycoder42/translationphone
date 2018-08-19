import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { TPSequenceList } from './tpsequencelist.js';
import { TPForm } from './tpform.js';
import store from './store.js';

// To run after page loads
const runOnReady = () => {
  // Bind the react content into the index.html
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <main>
          <h1 className="title">~ Translation Phone ~</h1>
          <TPForm/>
          <TPSequenceList/>
        </main>
      </Provider>
    </div>,
    document.querySelector('.container')
  );
}

// Run when the page is done loading
document.addEventListener("DOMContentLoaded", runOnReady);
