import React from 'react';
import styled from 'styled-components';
import { Status } from 'type';
import { useLoadStorage, useSaveStorage } from 'hooks/useStorage';
import TodoList from './TodoList/TodoList';

const TodoKanBan: React.FC = () => {
  useLoadStorage();
  useSaveStorage();

  return (
    <TodoKanBanContainer>
      <TodoList status={Status.NOT_STARTED} />
      <TodoList status={Status.IN_PROGRESS} />
      <TodoList status={Status.FINISHED} />
    </TodoKanBanContainer>
  );
};

export default TodoKanBan;

const TodoKanBanContainer = styled.section`
  display: flex;
  justify-content: center;
  margin: 100px auto 0;
`;
