import React, { useState } from 'react';
import { Priority, Status } from 'type';
import Modal, { ModalProps } from '../Modal';
import ToggleHandler from './ToggleHandler';
import DateRangePicker from './DateRangePicker';

export interface IFilterOptions {
  status: Status[];
  priority: Priority[];
  startDate?: Date;
  endDate?: Date;
}

export interface FilterModalProps extends ModalProps {
  filterOptions?: IFilterOptions;
}

//테스트용 merge시 삭제
const mockFilterOption: IFilterOptions = {
  status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED],
  priority: [Priority.LOW, Priority.HIGH],
  startDate: new Date('2021-10-24'),
  endDate: new Date('2021-12-24'),
};

const statusToggleList: Status[] = [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED];
const priorityToggleList: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];

const FilterModal: React.FC<FilterModalProps> = ({ filterOptions = mockFilterOption, visible, onClose }) => {
  const [filter, setFilter] = useState<IFilterOptions>(filterOptions);

  const handleFilter = (key: string, option: (Priority | Status)[]) => {
    setFilter((prev) => {
      return { ...prev, [key]: option };
    });
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <ToggleHandler info='status' toggleList={statusToggleList} activeList={filter.status} handleFilter={handleFilter} />
      <ToggleHandler info='priority' toggleList={priorityToggleList} activeList={filter.priority} handleFilter={handleFilter} />
      <DateRangePicker />
    </Modal>
  );
};

export default FilterModal;
