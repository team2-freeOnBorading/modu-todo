import React from 'react';
import TodoHeader from 'components/TodoHeader/TodoHeader';
import TodoList from 'components/TodoKanban/TodoKanBan';
import { ITodo, Priority, Status } from 'type';
import styled from 'styled-components';

const App: React.FC = () => {
  const todos: ITodo[] = [
    { id: 1, task: 'first', priority: Priority.HIGH, status: Status.NOT_STARTED, deadLine: '1', createdAt: '1' },
    { id: 2, task: 'second', priority: Priority.HIGH, status: Status.IN_PROGRESS, deadLine: '2', createdAt: '2' },
    { id: 3, task: 'third', priority: Priority.HIGH, status: Status.FINISHED, deadLine: '3', createdAt: '3' },
    { id: 4, task: 'fourth', priority: Priority.HIGH, status: Status.NOT_STARTED, deadLine: '1', createdAt: '1' },
    { id: 5, task: 'fifth', priority: Priority.HIGH, status: Status.IN_PROGRESS, deadLine: '2', createdAt: '2' },
    { id: 6, task: 'sixth', priority: Priority.HIGH, status: Status.FINISHED, deadLine: '3', createdAt: '3' },
  ];
  return (
    <TodoContainer>
      <TodoHeader />
      <TodoList todos={todos} />
    </TodoContainer>
  );
};

export default App;

const TodoContainer = styled.div`
  height: 100%;
  background-color: #f5f7f9;
`;
