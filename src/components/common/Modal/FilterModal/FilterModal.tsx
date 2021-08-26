import React, { useState } from 'react';
import styled from 'styled-components';
import { Priority, Status } from 'type';
import Modal, { IModal } from '../Modal';
import FilterToggleList from './FilterToggleList';
import FilterDatePicker from './FilterDatePicker';

export interface IFilterOptions {
  //filter state작업시 해당 interface 참고해 작업
  status: Status[]; //해당 배열에 있는 status만 렌더링
  priority: Priority[]; //해당 배열에 있는 우선순위를 가진 todo item만 렌더링
  startDate?: Date | null; //startDate null시 filter 콜백 함수에서 에서 true로 pass, 마감일이 해당 Date보다 높은 todo만 pass
  endDate?: Date | null; //null 일경우 true로 pass, 마감일이 해당 date값보다 낮은 todo만 render
}

export interface IFilterModal extends IModal {
  filterOptions?: IFilterOptions;
}

//테스트용 merge시 삭제
const mockFilterOption: IFilterOptions = {
  status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED],
  priority: [Priority.LOW, Priority.HIGH],
  startDate: new Date('2021-10-24'),
  endDate: null,
};

//status, priorityList 전체 옵션 array
const statusToggleList: Status[] = [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED];
const priorityToggleList: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];

const FilterModal: React.FC<IFilterModal> = ({ filterOptions = mockFilterOption, visible, onClose }) => {
  const [filter, setFilter] = useState<IFilterOptions>(filterOptions);

  //filter props 수정시 호출
  const handleFilter = (key: string, option: (Priority | Status)[] | Date | null) => {
    setFilter((prev) => {
      return { ...prev, [key]: option };
    });
  };

  //applyButton callback
  const applyFilter = () => {
    const { startDate, endDate } = filter;
    if (startDate && endDate && startDate > endDate) {
      //dateRange 예외처리 (startDate가 endDate보다 높을시)
      //추가적으로 알림 element popup되게 하면될듯
      return;
    }
    // setFilter code
  };

  return (
    <Modal visible={visible} onClose={onClose}>
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
  &:hover {
    background-color: #6d9b89;
  }
  color: #fff;
`;

export default FilterModal;
