import React from 'react';
import TodoHeader from 'components/TodoHeader/TodoHeader';
import TodoList from 'components/TodoList/TodoList';
import TodoFooter from 'components/TodoFooter/TodoFooter';

const App: React.FC = () => (
  <div>
    <TodoHeader />
    <TodoList />
    <TodoFooter />
  </div>
);

export default App;
