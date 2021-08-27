import React, { useState } from 'react';
import styled from 'styled-components';
import { Status, ITodo, Priority } from 'type';
import { useLoadStorage, useSaveStorage } from 'hooks/useStorage';
import TodoList from './TodoList/TodoList';
import useModal from 'hooks/useModal';
import DetailModal from 'components/common/Modal/DetailModal';

const defaultModal: ITodo = {
  id: 1,
  task: '',
  priority: Priority.LOW,
  status: Status.NOT_STARTED,
  deadLine: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const TodoKanBan: React.FC = () => {
  useLoadStorage();
  useSaveStorage();
  const [modalVisible, openModal, closeModal] = useModal(false);
  const [detailTodo, setDetailTodo] = useState<ITodo | null>(null);

  const openDetail = (item: ITodo) => {
    setDetailTodo(item);
    openModal();
  };

  return (
    <TodoKanBanContainer>
      <TodoList status={Status.NOT_STARTED} openDetail={openDetail} />
      <TodoList status={Status.IN_PROGRESS} openDetail={openDetail} />
      <TodoList status={Status.FINISHED} openDetail={openModal} />
      <DetailModal visible={modalVisible} onClose={closeModal} item={detailTodo || defaultModal} />
    </TodoKanBanContainer>
  );
};

export default TodoKanBan;

const TodoKanBanContainer = styled.section`
  display: flex;
  justify-content: center;
  margin: 100px auto 0;
`;
