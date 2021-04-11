import React, { FC } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { ShallowRoutes } from './ShallowRoutes';
import { Header } from './Header';

const App: FC = () => <BrowserRouter>
  <Header />
  <Switch>
    <Route path="/:type/:id">
      <ShallowRoutes />
    </Route>
  </Switch>
</BrowserRouter>;

export default App;
