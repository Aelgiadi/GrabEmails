import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Input from './components/body';
import Head from './components/header';

import './app.css';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <div>
        <Head />
        <Input />
      </div>
    </React.Fragment>
  );
};

export default App;
