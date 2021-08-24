import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { PRIORITY_RANGE } from '../../../utils/constants';
import 'react-datepicker/dist/react-datepicker.css';

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

  const [deadLine, setDeadLine] = useState(new Date());

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputValue({ ...inputValue, dueDate: deadLine });
  };

  return (
    <Wrapper>
      <TagList>
        <span>Todo </span>
        <span>InProgress </span>
        <span>Done </span>
      </TagList>
      <Form onSubmit={handleSubmit}>
        <input type='text' name='task' placeholder='할일은 입력하세요!' value={inputValue.task} onChange={(e) => handleChange(e)} />
        <select id='Priority' name='priority' onChange={(e) => handleChange(e)}>
          {PRIORITY_RANGE.map((priority: string, index: number) => {
            return (
              <option key={priority + index} value={inputValue.priority}>
                {priority}
              </option>
            );
          })}
        </select>
        <DatePicker minDate={new Date()} selected={deadLine} onChange={(date: Date) => setDeadLine(date)} />
        <button type='submit'>+</button>
      </Form>
    </Wrapper>
  );
};

export default TodoFilter;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 70px;
  background-color: #82d2b3;
`;

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  & button {
    font-size: 20px;
    padding: 0 10px;
    border: none;
    cursor: pointer;
  }
`;
