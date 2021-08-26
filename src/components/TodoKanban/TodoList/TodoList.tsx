import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTodoAndDispatchContext } from 'context/TodoContext';
// import { Status } from 'type';
import TodoItem from '../TodoItem/TodoItem';
import { ITodo, Priority, Status } from 'type';
interface ITodosProps {
  status: Status;
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[] | []>>;
}

const TodoList: React.FC<ITodosProps> = ({ todos, status, setTodos }) => {
  // const { todos } = useTodoAndDispatchContext();
  // const statusTodo = todos.filter((todo) => todo.status === status);
  // const restTodo = statusTodo.filter((todo) => todo.status !== Status.FINISHED).length;

  const draggingItem = useRef<number>();
  const dragOverItem = useRef<number>();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    draggingItem.current = position;
    console.log(draggingItem.current);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
    const todoCopy = [...todos];
    // console.log(`todoCopy`, todoCopy);
    const index = draggingItem.current as number;
    // console.log(`draggingItem.current`, draggingItem.current);
    const draggingItemContent = todoCopy[index];
    // console.log(`draggingItemContent`, draggingItemContent);
    todoCopy.splice(index, 1);
    todoCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    // dragOverItem.current = null;
    setTodos(todoCopy);
  };

  return (
    <TodosContainer>
      <StatusHead>
        {/* {status} | left: {restTodo} */}
        10
      </StatusHead>
      <TodosBlock>
        {todos.map((todo, index) => (
          <TodoBlock key={todo.id}>
            <TodoItem
              todo={todo}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={(e) => e.preventDefault()}
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
