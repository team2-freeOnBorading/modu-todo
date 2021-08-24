import React from 'react';
import styled from 'styled-components';
import { ITodo } from 'type';

interface ITodoProps {
  todo: ITodo;
}

const TodoItem: React.FC<ITodoProps> = ({ todo }) => {
  return (
    <TodoItemBlock>
      <div>task: {todo.task}</div>
      <div>priority: {todo.priority}</div>
      <div>deadLine: {todo.deadLine}</div>
    </TodoItemBlock>
  );
};

export default TodoItem;

const TodoItemBlock = styled.div`
  border: 1px solid red;
  background-color: #fff;
`;
