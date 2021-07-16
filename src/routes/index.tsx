import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Tasks from '../pages/Tasks';
import CreateTask from '../pages/CreateTask';

const Routes: React.FC = () => (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Tasks} />
        <Route path="/create" component={CreateTask} />
      </Switch>
    </BrowserRouter>
);

export default Routes;