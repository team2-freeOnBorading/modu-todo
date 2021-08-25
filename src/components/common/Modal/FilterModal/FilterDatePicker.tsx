import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

interface IFilterDatePicker {
  info: string;
  stateKey: string;
  placeholderText?: string;
  dateValue?: Date | null;
  handleFilter: (key: string, option: Date) => void;
}

const FilterDatePicker: React.FC<IFilterDatePicker> = ({ info, stateKey, dateValue, handleFilter, placeholderText }) => {
  return (
    <Wrapper>
      {info}
      <DatePickerWrapper>
        <DatePicker
          dateFormat='yyyy-MM-dd'
          minDate={new Date()}
          closeOnScroll={true}
          placeholderText={placeholderText}
          selected={dateValue}
          onChange={(date: Date) => {
            handleFilter(stateKey, date);
          }}
        />
      </DatePickerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 6px;
`;

const DatePickerWrapper = styled.div`
  padding-top: 3px;
`;

export default FilterDatePicker;
