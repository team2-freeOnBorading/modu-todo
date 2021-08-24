import React from 'react';

import styled from 'styled-components';
const TodoItem: React.FC = () => {
  const date = '2021/08/24';
  return (
    <div>
      <TodoItemLayout>
        <StatusEllipse color='#000000' />
        <TaskName>할일입니다!</TaskName>
        <DateAndPriority>
          <PriorityWrap>
            <PriorityEllipse color='#666BD3' />
            Low
          </PriorityWrap>
          <TodoDeadline>{date}</TodoDeadline>
        </DateAndPriority>
      </TodoItemLayout>
    </div>
  );
};

const TodoItemLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 100px;
  width: 454px;
  height: 89px;
  border-radius: 68px;
  background-color: #ffffff;
  box-shadow: 0px 3px 5px grey;
`;

const StatusEllipse = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 1rem;
  border: 3px solid ${(props) => props.color};
  border-radius: 50%;
`;

const TaskName = styled.div`
  width: 200px;
`;

const DateAndPriority = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PriorityWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const PriorityEllipse = styled.div`
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  margin-right: 0.4rem;
  background-color: ${(props) => props.color};
`;

const TodoDeadline = styled.div``;
export default TodoItem;
