import React from 'react';

import styled from 'styled-components';
const TodoItem: React.FC = () => {
  return (
    <div>
      <TodoLayout></TodoLayout>
    </div>
  );
};

const TodoLayout = styled.div`
  width: 454px;
  height: 89px;
  border-radius: 68px;
  background-color: skyblue;
`;

export default TodoItem;
