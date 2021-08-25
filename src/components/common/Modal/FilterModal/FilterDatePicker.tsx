import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface IFilterDatePicker {
  info: string;
  stateKey: string;
  placeholderText?: string;
  dateValue?: Date | null;
  handleFilter: (key: string, option: Date | null) => void;
}

const FilterDatePicker: React.FC<IFilterDatePicker> = ({ info, stateKey, dateValue, handleFilter, placeholderText }) => {
  const clearDate = () => {
    handleFilter(stateKey, null);
  };
  return (
    <Wrapper>
      <Header>
        {info}
        <ClearButton onClick={clearDate}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </ClearButton>
      </Header>
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

const Header = styled.div`
  display: flex;
`;

const DatePickerWrapper = styled.div`
  padding-top: 3px;
`;

const ClearButton = styled.div`
  margin-left: 12px;
  border: none;
`;

export default FilterDatePicker;
