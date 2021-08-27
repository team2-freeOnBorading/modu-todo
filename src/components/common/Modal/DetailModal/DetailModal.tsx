import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ITodo, IEditTodo, Priority, Status } from 'type';
import Modal, { IModal } from '../Modal';
import { dateToString } from 'utils/commons';
import { useTodoAndDispatchContext } from 'context/TodoContext';
import { ApplyButton } from '../Button';
import { PRIORITY_RANGE, STATUS_RANGE } from 'utils/constants';
import ModalDatePicker from '../Form/ModalDatePicker';
import ModalRadioForm from '../Form/ModalRadioForm';

interface IDetailModal extends IModal {
  item: ITodo;
}

const DetailModal: React.FC<IDetailModal> = ({ item, visible, onClose }) => {
  const { createdAt, updatedAt } = item;
  const { dispatch } = useTodoAndDispatchContext();
  const [editTodo, setEditTodo] = useState<IEditTodo>(item);
  const { task, priority, status, deadLine } = editTodo;
  useEffect(() => {
    setEditTodo(item);
  }, [item]);

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
    if (!task) {
      console.error('todo is null!');
      //알림 추가해야 할듯..
      return;
    }
    dispatch({ type: 'EDIT', editTodo: editTodo });
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Wrapper>
        <Label>TodoTask</Label>
        <TodoTaskInput onChange={onChangeTask} value={task} />
        <ModalRadioForm
          optionKey='priority'
          headerText='중요도'
          activeOption={priority || PRIORITY_RANGE[0]}
          optionList={PRIORITY_RANGE}
          handleValue={handleTodo}
        />
        <ModalRadioForm optionKey='status' headerText='상태' activeOption={status || STATUS_RANGE[0]} optionList={STATUS_RANGE} handleValue={handleTodo} />
        <ModalDatePicker
          info='마감일'
          stateKey='deadLine'
          placeholderText='마감일 미설정'
          dateValue={deadLine ? new Date(deadLine) : null}
          handleValue={handleTodo}
          isClearButton={false}
        />
        <Label>생성일</Label>
        <Value>{dateToString(createdAt)}</Value>
        <Label>수정일</Label>
        <Value>{dateToString(updatedAt)}</Value>
        <ApplyButton onClick={applyTodo}>apply</ApplyButton>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 380px;
`;

const TodoTaskInput = styled.input``;

const Label = styled.div`
  font-size: 17px;
  margin-bottom: 4px;
`;

const Value = styled.div`
  margin-bottom: 12px;
`;

export default DetailModal;
