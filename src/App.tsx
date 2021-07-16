import React from 'react';
import { TasksProvider } from './hooks/tasks';

import Routes from './routes'

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <div style={{ width: '100vw', height: '100vh' }} >
    <TasksProvider>
      <Routes />
    </TasksProvider>

    <GlobalStyle />
  </div>
);

export default App;