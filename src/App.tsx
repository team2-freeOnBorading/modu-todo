import React from 'react';
import styled from 'styled-components';
import TodoHeader from 'components/TodoHeader/TodoHeader';
import TodoKanBan from 'components/TodoKanban/TodoKanBan';
import { ITodo, Priority, Status } from 'type';

const App: React.FC = () => {
  const todos: ITodo[] = [
    { id: 1, task: 'first', priority: Priority.HIGH, status: Status.NOT_STARTED, deadLine: '1', createdAt: '1' },
    { id: 2, task: 'second', priority: Priority.HIGH, status: Status.IN_PROGRESS, deadLine: '2', createdAt: '2' },
    { id: 3, task: 'third', priority: Priority.MEDIUM, status: Status.FINISHED, deadLine: '3', createdAt: '3' },
    { id: 4, task: 'fourth', priority: Priority.MEDIUM, status: Status.NOT_STARTED, deadLine: '1', createdAt: '1' },
    { id: 5, task: 'fifth', priority: Priority.LOW, status: Status.IN_PROGRESS, deadLine: '2', createdAt: '2' },
    { id: 6, task: 'sixth', priority: Priority.LOW, status: Status.FINISHED, deadLine: '3', createdAt: '3' },
  ];

  return (
    <TodoContainer>
      <TodoHeader />
      <TodoKanBan todos={todos} />
    </TodoContainer>
  );
};

export default App;

const TodoContainer = styled.div`
  height: 100vh;
  background-color: #f6f6f6;
`;
