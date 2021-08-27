import React, { useState } from 'react';
import styled from 'styled-components';
import { Priority, Status } from 'type';
import Modal, { IModal } from '../Modal';
import FilterToggleList from './FilterToggleList';
import FilterDatePicker from './FilterDatePicker';
import { useTodoAndDispatchContext } from 'context/TodoContext';

export interface IFilterOptions {
  status: Status[];
  priority: Priority[];
  startDate: Date | null;
  endDate: Date | null;
}

export interface IFilterModal extends IModal {
  filterOptions?: IFilterOptions;
}

//테스트용 merge시 삭제
const mockFilterOption: IFilterOptions = {
  status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED],
  priority: [Priority.LOW, Priority.MEDIUM, Priority.HIGH],
  startDate: null,
  endDate: null,
};

const statusToggleList: Status[] = [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED];
const priorityToggleList: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];

const FilterModal: React.FC<IFilterModal> = ({ filterOptions = mockFilterOption, visible, onClose }) => {
  const [filter, setFilter] = useState<IFilterOptions>(filterOptions);
  const { dispatch } = useTodoAndDispatchContext();

  const handleFilter = (key: string, option: (Priority | Status)[] | Date | null) => {
    setFilter((prev) => {
      return { ...prev, [key]: option };
    });
  };

  const applyFilter = () => {
    const { startDate, endDate } = filter;
    if (startDate && endDate && startDate > endDate) {
      //추가적으로 알림 element popup되게 하면될듯
      return;
    }

    dispatch({ type: 'FILTER', filters: filter });
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Wrapper>
        <FilterToggleList info='status' toggleList={statusToggleList} activeList={filter.status} handleFilter={handleFilter} />
        <FilterToggleList info='priority' toggleList={priorityToggleList} activeList={filter.priority} handleFilter={handleFilter} />
        <FilterDatePicker
          info='최소 deadLine'
          stateKey='startDate'
          dateValue={filter.startDate}
          placeholderText='최소 deadLine 선택'
          handleFilter={handleFilter}
        />
        <FilterDatePicker info='최대 deadLine' stateKey='endDate' dateValue={filter.endDate} placeholderText='최대 deadLine 선택' handleFilter={handleFilter} />
        <ApplyButton onClick={applyFilter}>Apply</ApplyButton>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 400px;
`;

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
  &:hover {
    background-color: #6d9b89;
  }
  color: #fff;
`;

export default FilterModal;
