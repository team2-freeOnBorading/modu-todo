import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

interface IFilterDatePicker {
  info: string;
  stateKey: string;
  dateValue?: Date;
  handleFilter: (key: string, option: Date) => void;
}

const FilterDatePicker: React.FC<IFilterDatePicker> = ({ info, stateKey, dateValue, handleFilter }) => {
  return (
    <Wrapper>
      {info}
      <DatePickerWrapper>
        <DatePicker
          dateFormat='yyyy-MM-dd'
          minDate={new Date()}
          closeOnScroll={true}
          placeholderText='마감 날짜 선택'
          selected={dateValue}
          onChange={(date: Date) => {
            handleFilter(stateKey, date);
          }}
        />
      </DatePickerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const DatePickerWrapper = styled.div``;

export default FilterDatePicker;
