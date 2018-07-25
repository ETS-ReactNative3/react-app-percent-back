import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Table from './table';
import Input from './input';
import Chart from './chart';
import Login from './Login';
import Register from './Register';

const FourOhFour = () => <h1 className='FourOhFour'>404</h1>;

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path="/input" component={Input} />
        <Route exact path="/table" component={Table} />
        <Route exact path="/chart" component={Chart} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>

)

export default App;

