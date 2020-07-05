import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from '../login/index';
import Registration from '../registration/index';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Registration} />
          <Redirect path='/' to='/login' />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;