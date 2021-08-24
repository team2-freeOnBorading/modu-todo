import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { PRIORITY_RANGE } from '../../../utils/constants';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';

interface IInputValue {
  task: string;
  dueDate: Date;
  priority: string;
}

const TodoFilter: React.FC = () => {
  const [inputValue, setInputValue] = useState<IInputValue>({
    task: '',
    dueDate: new Date(),
    priority: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputValue({ ...inputValue, dueDate: inputValue.dueDate });
  };

  return (
    <Wrapper>
      <TagList>
        <span>Todo </span>
        <span>InProgress </span>
        <span>Done </span>
      </TagList>
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
        <DatePicker minDate={new Date()} selected={inputValue.dueDate} onChange={(date: Date) => setInputValue({ ...inputValue, dueDate: date })} />
        <button type='submit'>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button>
          <FontAwesomeIcon icon={faSortAmountDown} /> Sort
        </button>
        <button>
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </button>
      </Form>
    </Wrapper>
  );
};

export default TodoFilter;

const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  width: 100vw;
  height: 70px;
  background-color: #82d2b3;
  display: flex;
  justify-content: center;
  align-items: center;
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
  & button {
    font-size: 1.5rem;
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

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 0;
  margin-right: 1rem;
`;
