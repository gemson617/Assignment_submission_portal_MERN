import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main.js';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './student/stores/ErrorStores';

function RootComponent() {
  return (

    <Provider store={store}>

      <BrowserRouter>
        <Main />
      </BrowserRouter>

    </Provider>


  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);
