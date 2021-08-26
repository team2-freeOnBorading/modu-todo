import React, { useState } from 'react';
import styled from 'styled-components';
import { ITodo, IEditTodo, Priority, Status } from 'type';
import Modal, { IModal } from '../Modal';
import { dateToString } from 'utils/commons';
import { useTodoAndDispatchContext } from 'context/TodoContext';
import { ApplyButton, RadioButtonItem } from '../Button';
import { PRIORITY_RANGE, STATUS_RANGE } from 'utils/constants';
import ModalDatePicker from '../ModalDatePicker';

interface IDetailModal extends IModal {
  item: ITodo;
}

const DetailModal: React.FC<IDetailModal> = ({ item, visible, onClose }) => {
  const { createdAt, updatedAt } = item;
  const { dispatch } = useTodoAndDispatchContext();
  const [editTodo, setEditTodo] = useState<IEditTodo>(item);
  const { task, priority, status, deadLine } = editTodo;

  const handleTodo = (key: string, value: string | Priority | Status | Date | null) => {
    setEditTodo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleTodo('task', e.target.value);
  };

  const applyTodo = () => {
    dispatch({ type: 'EDIT', editTodo: editTodo });
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Wrapper>
        <Label>TodoTask</Label>
        <TodoText onChange={onChangeTask} value={task} />
        <Label>Proiority</Label>
        <Value>{priority}</Value>
        <Label>Status</Label>
        <Value>{status}</Value>
        {deadLine && <ModalDatePicker info='마감일' stateKey='deadLine' placeholderText='마감일 미설정' dateValue={deadLine} handleValue={handleTodo} />}
        <Label>CreatedAt</Label>
        <Value>{dateToString(createdAt)}</Value>
        <Label>UpdatedAt</Label>
        <Value>{dateToString(updatedAt)}</Value>
        <ApplyButton onClick={applyTodo}>apply</ApplyButton>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 380px;
`;

const TodoText = styled.input``;

const Label = styled.div`
  font-size: 17px;
  margin-bottom: 4px;
`;

const Value = styled.div`
  margin-bottom: 12px;
`;

export default DetailModal;
