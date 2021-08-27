import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Status, ITodo } from 'type';
import TodoItem from '../TodoItem/TodoItem';

interface ITodosProps {
  status: Status;
  todos: ITodo[];
  openDetail: (item: ITodo) => void;
}

const TodoList: React.FC<ITodosProps> = ({ todos, status, openDetail }) => {
  const [mtodos, setMtodos] = useState<ITodo[]>([]);

  const [isDrag, setIsDrag] = useState<boolean>(false);

  useEffect(() => {
    setMtodos(todos);
  }, [todos]);

  const draggingItem = useRef<number | null>(0);
  const dragOverItem = useRef<number | null>(0);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    draggingItem.current = position;
    setIsDrag(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    const todoCopy = mtodos;
    const index = draggingItem.current as number;
    const draggingItemContent = mtodos[index];
    dragOverItem.current = position;
    todoCopy.splice(index, 1);
    todoCopy.splice(dragOverItem.current, 0, draggingItemContent);
    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;

    setMtodos([...todoCopy]);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
  };

  return (
    <TodosContainer>
      <StatusHead>
        <span>{status}</span> | <span>{mtodos.length}</span>
      </StatusHead>
      <TodosBlock>
        {mtodos.map((todo, index) => (
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

  span {
    margin: 0 10px;
  }
`;
