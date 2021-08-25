import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import TodoFilter from './TodoFilter/TodoFilter';
import styled from 'styled-components';
import { ITodo } from 'type';

interface IHeaderProps {
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  todos: ITodo[];
}

const TodoHeader = ({ setTodos, todos }: IHeaderProps): JSX.Element => {
  const [currentTime, setCurrentTime] = useState('');

  const getCurrentTime = () => {
    const curr = new Date();
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const krTime = new Date(utc + KR_TIME_DIFF).toLocaleString('ko-KR');

    setCurrentTime(krTime);
  };

  useEffect(() => {
    setInterval(getCurrentTime, 1000);
    return () => {
      setInterval(getCurrentTime, 1000);
    };
  }, []);

  return (
    <>
      <Wrapper>
        <h1>MODU ? TODO!</h1>
        <span>{currentTime}</span>
      </Wrapper>
      <TodoFilter todos={todos} setTodos={setTodos} />
    </>
  );
};

export default TodoHeader;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100px;
  z-index: 1;
  background-color: #8ee5c2;
  & span {
    color: white;
    font-weight: bold;
    position: fixed;
    top: 80px;
  }
  & h1 {
    margin: 0;
    color: white;
    text-align: center;
    line-height: 100px;
  }
`;
