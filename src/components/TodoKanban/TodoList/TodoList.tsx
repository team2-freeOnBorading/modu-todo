import React from 'react';
import styled from 'styled-components';
import { useTodoAndDispatchContext } from 'context/TodoContext';
import { Status } from 'type';
import TodoItem from '../TodoItem/TodoItem';

interface ITodosProps {
  status: Status;
}

const TodoList: React.FC<ITodosProps> = ({ status }) => {
  const {
    TodosWithFilterAndSort: { todos },
  } = useTodoAndDispatchContext();

  const statusTodo = todos.filter((todo) => todo.status === status);
  const restTodo = statusTodo.filter((todo) => todo.status !== Status.FINISHED).length;

  return (
    <TodosContainer>
      <StatusHead>
        {status} | left: {restTodo}
      </StatusHead>
      <TodosBlock>
        {statusTodo.map((todo) => (
          <TodoBlock key={todo.id}>
            <TodoItem todo={todo} />
          </TodoBlock>
        ))}
      </TodosBlock>
    </TodosContainer>
  );
};

export default TodoList;

const TodosContainer = styled.article`
  margin: 100px 0;

  &:nth-child(2) {
    margin: 100px;
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
