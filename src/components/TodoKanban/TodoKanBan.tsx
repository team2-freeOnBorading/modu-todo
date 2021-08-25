import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoState } from 'TodoContext';
import { Status } from 'type';
import TodoList from './TodoList/TodoList';

const TodoKanBan: React.FC = () => {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();

  useEffect(() => {
    dispatch({ type: 'LOAD_TODOS', todos: JSON.parse(localStorage.getItem('todos')!) || [] });
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoKanBanContainer>
      <TodoList todos={todos.filter((todo) => todo.status === Status.NOT_STARTED)} status={Status.NOT_STARTED} />
      <TodoList todos={todos.filter((todo) => todo.status === Status.IN_PROGRESS)} status={Status.IN_PROGRESS} />
      <TodoList todos={todos.filter((todo) => todo.status === Status.FINISHED)} status={Status.FINISHED} />
    </TodoKanBanContainer>
  );
};

export default TodoKanBan;

const TodoKanBanContainer = styled.section`
  display: flex;
  justify-content: center;
  margin: 100px auto 0;
`;
