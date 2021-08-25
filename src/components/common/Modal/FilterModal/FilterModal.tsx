import React, { useState } from 'react';
import styled from 'styled-components';
import { Priority, Status } from 'type';
import Modal, { ModalProps } from '../Modal';
import ToggleHandler from './ToggleHandler';
import FilterDatePicker from './FilterDatePicker';

export interface IFilterOptions {
  status: Status[];
  priority: Priority[];
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface FilterModalProps extends ModalProps {
  filterOptions?: IFilterOptions;
}

//테스트용 merge시 삭제
const mockFilterOption: IFilterOptions = {
  status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED],
  priority: [Priority.LOW, Priority.HIGH],
  startDate: new Date('2021-10-24'),
  endDate: null,
};

const statusToggleList: Status[] = [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED];
const priorityToggleList: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];

const FilterModal: React.FC<FilterModalProps> = ({ filterOptions = mockFilterOption, visible, onClose }) => {
  const [filter, setFilter] = useState<IFilterOptions>(filterOptions);

  const handleFilter = (key: string, option: (Priority | Status)[] | Date) => {
    setFilter((prev) => {
      return { ...prev, [key]: option };
    });
  };

  const applyFilterOption = () => {
    const { startDate, endDate } = filter;
    console.log(filter, 'applyAction');
    if (startDate && endDate && startDate > endDate) {
      console.error('rangeError');
      return;
    }
    // setFilter code
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <ToggleHandler info='status' toggleList={statusToggleList} activeList={filter.status} handleFilter={handleFilter} />
      <ToggleHandler info='priority' toggleList={priorityToggleList} activeList={filter.priority} handleFilter={handleFilter} />
      <FilterDatePicker
        info='최소 deadLine'
        stateKey='startDate'
        dateValue={filter.startDate}
        placeholderText={'최소 deadLine 선택'}
        handleFilter={handleFilter}
      />
      <FilterDatePicker info='최대 deadLine' stateKey='endDate' dateValue={filter.endDate} placeholderText={'최대 deadLine 선택'} handleFilter={handleFilter} />
      <ApplyButton onClick={applyFilterOption}>Apply</ApplyButton>
    </Modal>
  );
};

const ApplyButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 20px;
  width: 120px;
  padding: 3px;
  margin: 2px;
  border: 0;
  border-radius: 10px;
  background-color: #82d2b3;
  &: hover {
    background-color: #6d9b89;
  }
  color: #fff;
`;

export default FilterModal;
