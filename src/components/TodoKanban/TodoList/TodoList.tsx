import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useTodoAndDispatchContext } from 'context/TodoContext';
import { Status, ITodo } from 'type';
import TodoItem from '../TodoItem/TodoItem';

interface ITodosProps {
  status: Status;
  openDetail: (item: ITodo) => void;
}

const TodoList: React.FC<ITodosProps> = ({ status, openDetail }) => {
  const {
    modifiedTodos,
    todosWithFilterAndSort: { todos },
    dispatch,
  } = useTodoAndDispatchContext();

  const [isDrag, setIsDrag] = useState<boolean>(false);

  const statusTodo = modifiedTodos.filter((todo) => todo.status === status);
  const restTodo = statusTodo.filter((todo) => todo.status !== Status.FINISHED).length;

  const draggingItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    draggingItem.current = position;
    setIsDrag(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    const todoCopy = todos;
    const index = draggingItem.current as number;
    const draggingItemContent = modifiedTodos[index];

    dragOverItem.current = position;
    todoCopy.splice(index, 1);
    todoCopy.splice(dragOverItem.current, 0, draggingItemContent);
    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;

    dispatch({ type: 'DrageAndDrop', todos: todoCopy });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
  };

  return (
    <TodosContainer>
      <StatusHead>
        {status} | left: {restTodo}
      </StatusHead>
      <TodosBlock>
        {statusTodo.map((todo, index) => (
          <TodoBlock key={todo.id}>
            <TodoItem
              todo={todo}
              openDetail={openDetail}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={(e) => handleDragEnd(e)}
              isDrag={isDrag}
            />
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
  border: none;
  border-radius: 20px;
  background-color: #e9e9e9;
  box-shadow: 0px 3px 4px lightgrey;
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
