import React, { useState } from 'react';
import styled from 'styled-components';
import { ITodo, IEditTodo } from 'type';
import Modal, { IModal } from '../Modal';
import { dateToString } from 'utils/commons';
import { useTodoAndDispatchContext } from 'context/TodoContext';

interface IDetailModal extends IModal {
  item: ITodo;
}

const DetailModal: React.FC<IDetailModal> = ({ item, visible, onClose }) => {
  const { createdAt, updatedAt } = item;
  const { dispatch } = useTodoAndDispatchContext();
  const [editTodo, setEditTodo] = useState<IEditTodo>(item);
  const { task, priority, status, deadLine } = editTodo;

  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo((prev) => ({ ...prev, task: e.target.value }));
  };

  const applyTodo = () => {
    dispatch({ type: 'EDIT', editTodo: editTodo });
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Wrapper>
        <TodoText onChange={onChangeTask} value={task} />
        <Label>Proiority</Label>
        <Value>{priority}</Value>
        <Label>Status</Label>
        <Value>{status}</Value>
        {deadLine && (
          <>
            <Label>DeadLine</Label>
            <Value>{dateToString(deadLine)}</Value>
          </>
        )}
        <Label>CreatedAt</Label>
        <Value>{dateToString(createdAt)}</Value>
        <Label>UpdatedAt</Label>
        <Value>{dateToString(updatedAt)}</Value>
        <button onClick={applyTodo}>apply</button>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 380px;
`;

const TodoText = styled.input``;

const Label = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

const Value = styled.div`
  margin-bottom: 12px;
`;

export default DetailModal;
