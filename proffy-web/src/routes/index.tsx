import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from '../pages/Landing';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Landing} exact />
  </Switch>
);

export default Routes;
