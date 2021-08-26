import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { Status } from 'type';
import { useLoadStorage, useSaveStorage } from 'hooks/useStorage';
import TodoList from './TodoList/TodoList';
import { ITodo, Priority, Status } from 'type';
const TodoKanBan: React.FC = () => {
  useLoadStorage();
  useSaveStorage();
  const todos: ITodo[] = [
    { id: 1, task: 'first', priority: Priority.HIGH, status: Status.NOT_STARTED, deadLine: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: 2, task: 'second', priority: Priority.HIGH, status: Status.IN_PROGRESS, deadLine: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: 3, task: 'third', priority: Priority.MEDIUM, status: Status.FINISHED, deadLine: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: 4, task: 'fourth', priority: Priority.MEDIUM, status: Status.NOT_STARTED, deadLine: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: 5, task: 'fifth', priority: Priority.LOW, status: Status.IN_PROGRESS, deadLine: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: 6, task: 'sixth', priority: Priority.LOW, status: Status.FINISHED, deadLine: new Date(), createdAt: new Date(), updatedAt: new Date() },
  ];
  const [tdos, setTdos] = useState<ITodo[] | []>([]);

  useEffect(() => {
    setTdos(todos);
  }, []);
  return (
    <TodoKanBanContainer>
      <TodoList status={Status.NOT_STARTED} todos={tdos} setTodos={setTdos} />
      <TodoList status={Status.IN_PROGRESS} todos={tdos} setTodos={setTdos} />
      <TodoList status={Status.FINISHED} todos={tdos} setTodos={setTdos} />
    </TodoKanBanContainer>
  );
};

export default TodoKanBan;

const TodoKanBanContainer = styled.section`
  display: flex;
  justify-content: center;
  margin: 100px auto 0;
`;
