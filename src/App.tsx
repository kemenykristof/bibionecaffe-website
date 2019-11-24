import React from 'react';
import ImageMenu from './components/ImageMenu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Pizza from './components/Pizza';
import NotFoundPage from './components/NotFoundPage';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import HealthyFood from './components/HealthyFood';
import StoreState from './context/StoreState';
import Cart from './components/Cart';
import Order from './components/Order';
import ContactPage from './components/ContactPage';
import TestData from './components/TestData';

interface Props {}

export default function App(props: Props) {
  return (
    <StoreState>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ImageMenu} exact />
          <Route path="/pizza" component={Pizza} exact />
          <Route path="/etlap" component={Meals} exact />
          <Route path="/italok" component={Drinks} exact />
          <Route path="/egeszseges" component={HealthyFood} exact />
          <Route path="/kapcsolat" component={ContactPage} exact />
          <Route path="/kosar" component={Cart} />
          <Route path="/rendeles" component={Order} />
          <Route path="/test" component={TestData} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </StoreState>
  );
}
