import React from 'react';
import styled from 'styled-components';
import { ITodo, Status } from 'type';
import TodoItem from '../TodoItem/TodoItem';

interface ITodosProps {
  todos: ITodo[];
  status: Status;
}

const Todos: React.FC<ITodosProps> = ({ todos, status }) => {
  const restTodo = todos.filter((todo) => todo.status !== Status.FINISHED).length;
  return (
    <TodosContainer>
      <StatusHead>
        {status} | left: {restTodo}
      </StatusHead>
      <TodosBlock>
        {todos.map((todo) => (
          <TodoBlock key={todo.id}>
            <TodoItem todo={todo} />
          </TodoBlock>
        ))}
      </TodosBlock>
    </TodosContainer>
  );
};

export default Todos;

const TodosContainer = styled.article`
  margin-top: 100px;

  &:nth-child(2) {
    margin: 100px 100px;
  }
`;

const TodosBlock = styled.div`
  width: 400px;
  min-height: 500px;
  padding: 20px 13px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: #e9e9e9;
`;

const TodoBlock = styled.div`
  & + & {
    margin: 15px 0;
  }
`;
const StatusHead = styled.h4`
  display: inline-block;
  position: relative;
  left: 15px;
  padding: 5px;
`;
