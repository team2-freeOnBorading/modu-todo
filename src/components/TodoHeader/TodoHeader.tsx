import React from 'react';
import TodoFilter from './TodoFilter/TodoFilter';
import styled from 'styled-components';

const TodoHeader: React.FC = () => {
  return (
    <>
      <Wrapper>
        <h1>MODU ? TODO!</h1>
      </Wrapper>
      <TodoFilter />
    </>
  );
};

export default TodoHeader;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100px;
  background-color: #8ee5c2;
  z-index: 1;

  & h1 {
    margin: 0;
    color: white;
    text-align: center;
    line-height: 100px;
  }
`;
