import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ITodo } from 'type';

interface ITodoProps {
  todo: ITodo;
}

const TodoItem: React.FC<ITodoProps> = ({ todo }) => {
  const { task, priority, deadLine } = todo;
  return (
    <div>
      <TodoItemLayout>
        <StatusEllipse color='#000000' />
        <TaskName>{task}</TaskName>
        <DateAndPriority>
          <PriorityWrap>
            <PriorityEllipse color='#FF0202' />
            <Priority>{priority}</Priority>
          </PriorityWrap>
          <TodoDeadline>{deadLine}</TodoDeadline>
        </DateAndPriority>
        <div>
          <DeleteIcon>
            <FontAwesomeIcon icon={faTrashAlt} />
          </DeleteIcon>
          <EditIcon>
            <FontAwesomeIcon icon={faPen} />
          </EditIcon>
        </div>
      </TodoItemLayout>
    </div>
  );
};

const TodoItemLayout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 370px;
  padding: 1rem 0;
  border-radius: 68px;
  background-color: #ffffff;
  box-shadow: 0px 3px 4px lightgrey;
`;

const StatusEllipse = styled.button`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: -0.8rem;
  border: 2.5px solid ${(props) => props.color};
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
`;

const TaskName = styled.div`
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DateAndPriority = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 -1rem;
`;

const PriorityWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const PriorityEllipse = styled.div`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  margin-right: 0.4rem;
  background-color: ${(props) => props.color};
`;

const Priority = styled.p`
  font-size: 1rem;
`;

const TodoDeadline = styled.p`
  font-size: 0.7rem;
`;

const DeleteIcon = styled.button`
  border: none;
  margin: 0 1rem;
  background-color: #ffffff;
`;

const EditIcon = styled.button`
  border: none;
  background-color: #ffffff;
`;

export default TodoItem;
