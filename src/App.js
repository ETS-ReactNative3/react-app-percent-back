import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Table from './table';
import Input from './input';
import Chart from './chart';

const FourOhFour = () => <h1 class='FourOhFour'>404</h1>

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Switch>
        <Route exact path="/" component={Input} />
        <Route exact path="/table" component={Table} />
        <Route exact path="/chart" component={Chart} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>

)

export default App;