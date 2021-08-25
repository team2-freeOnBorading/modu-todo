import React from 'react';
import styled from 'styled-components';
import { ITodo, Status } from 'type';
import Todos from './TodoList/TodoList';

interface ITodoTodoKanBanProps {
  todos: ITodo[];
}
const TodoKanBan: React.FC<ITodoTodoKanBanProps> = ({ todos }) => {
  return (
    <TodoKanBanContainer>
      <Todos todos={todos.filter((todo) => todo.status === Status.NOT_STARTED)} status={Status.NOT_STARTED} />
      <Todos todos={todos.filter((todo) => todo.status === Status.IN_PROGRESS)} status={Status.IN_PROGRESS} />
      <Todos todos={todos.filter((todo) => todo.status === Status.FINISHED)} status={Status.FINISHED} />
    </TodoKanBanContainer>
  );
};

export default TodoKanBan;

const TodoKanBanContainer = styled.section`
  display: flex;
  justify-content: center;
  margin: 100px auto 0;
`;
