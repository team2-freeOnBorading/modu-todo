import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { PRIORITY_RANGE } from 'utils/constants';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Status, Priority } from 'type';
import { useTodoAndDispatchContext } from 'context/TodoContext';

const TodoFilter = (): JSX.Element => {
  const { dispatch } = useTodoAndDispatchContext();
  const [inputValue, setInputValue] = useState({
    task: '',
    deadLine: new Date(),
    priority: Priority.LOW,
    status: Status.NOT_STARTED,
    createdAt: new Date(),
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputValue({ ...inputValue, deadLine: inputValue.deadLine });
    dispatch({ type: 'CREATE', todo: inputValue });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <FormInput type='text' name='task' placeholder='할일은 입력하세요!' value={inputValue.task} onChange={(e) => handleChange(e)} />
        <select id='priority' name='priority' onChange={(e) => handleChange(e)}>
          {PRIORITY_RANGE.map((priority: string, index: number) => {
            return (
              <option key={priority + index} value={priority}>
                {priority}
              </option>
            );
          })}
        </select>
        <DatePicker
          dateFormat='yyyy-MM-dd'
          minDate={new Date()}
          closeOnScroll={true}
          placeholderText='마감 날짜 선택'
          selected={inputValue.deadLine}
          onChange={(date: Date) => setInputValue({ ...inputValue, deadLine: date })}
        />
        <button type='submit'>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </Form>
      <button>
        <FontAwesomeIcon icon={faSortAmountDown} /> Sort
      </button>
      <button>
        <FontAwesomeIcon icon={faFilter} />
        Filter
      </button>
    </Wrapper>
  );
};

export default TodoFilter;

const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  width: 100vw;
  height: 70px;
  z-index: 1;
  background-color: #82d2b3;
  display: flex;
  justify-content: center;
  align-items: center;
  & button {
    font-size: 1.2rem;
    padding: 5px 10px;
    margin-right: 5px;
    border: none;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    &:hover {
      background-color: #dfdfdf;
    }
  }
`;

const FormInput = styled.input`
  padding: 10px;
  border: 0;
  margin-right: 1rem;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  & .react-datepicker-wrapper,
  .react-datepicker__input-container input {
    border: 0;
    width: 10rem;
    font-size: 1.1rem;
    margin-right: 1rem;
  }
  & input {
    width: 20rem;
    &:last-child {
      padding: 10px 0;
      border: 0;
    }
  }
  & select {
    border: none;
    padding: 6px 20px;
    margin-right: 1rem;
  }
`;
