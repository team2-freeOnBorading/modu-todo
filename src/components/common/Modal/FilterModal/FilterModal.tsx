import React, { useState } from 'react';
import styled from 'styled-components';
import { Priority, Status } from 'type';
import Modal, { IModal } from '../Modal';
import { ApplyButton } from '../Button';
import { PRIORITY_RANGE } from 'utils/constants';
import FilterToggleList from './FilterToggleList';
import ModalDatePicker from '../Form/ModalDatePicker';
import { useTodoAndDispatchContext } from 'context/TodoContext';
import { getMaxDate, getMinDate, getKoreaTime } from 'utils/commons';
import useModal from 'hooks/useModal';
import ConfirmModal from '../ConfirmModal';

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

const FilterModal: React.FC<IFilterModal> = ({ filterOptions = mockFilterOption, visible, onClose }) => {
  const [filter, setFilter] = useState<IFilterOptions>(filterOptions);
  const { dispatch } = useTodoAndDispatchContext();
  const [confirmVisible, openConfirm, closeConfirm] = useModal(false);

  const handleFilter = (key: string, option: (Priority | Status)[] | Date | null) => {
    setFilter((prev) => {
      return { ...prev, [key]: option };
    });
  };
  const applyFilter = () => {
    const { startDate, endDate } = filter;
    if (startDate && endDate && startDate > endDate) {
      openConfirm();
      return;
    }

    dispatch({ type: 'FILTER', filters: filter });
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Wrapper>
        <FilterToggleList
          headerText='priority'
          optionKey='priority'
          toggleList={PRIORITY_RANGE as Priority[]}
          activeList={filter.priority}
          handleFilter={handleFilter}
        />
        <ModalDatePicker
          info='최소 deadLine'
          stateKey='startDate'
          dateValue={getMinDate(getKoreaTime(filter.startDate))}
          placeholderText='최소 deadLine 선택'
          handleValue={handleFilter}
        />
        <ModalDatePicker
          info='최대 deadLine'
          stateKey='endDate'
          dateValue={getMaxDate(getKoreaTime(filter.endDate))}
          placeholderText='최대 deadLine 선택'
          handleValue={handleFilter}
        />
        <ApplyButton onClick={applyFilter}>Apply</ApplyButton>
      </Wrapper>
      <ConfirmModal visible={confirmVisible} onClose={closeConfirm} text={'endDate가 startDate보다 빠릅니다!'} />
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 400px;
`;

export default FilterModal;
