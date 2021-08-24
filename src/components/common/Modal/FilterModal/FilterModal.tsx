import React, { useState } from 'react';
import { Priority, Status } from 'type';
import Modal, { ModalProps } from '../Modal';
import ToggleHandler from './ToggleHandler';

const mockFilterOption: any = {
  status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED],
  priority: [Priority.LOW, Priority.HIGH],
  startDate: '2021-10-24',
  endDate: '2021-12-24',
};

export interface IFilterOptions {
  status: Status[];
  priority: Priority[];
  startDate?: string;
  endDate?: string;
}

export interface FilterModalProps extends ModalProps {
  filterOptions?: IFilterOptions;
}

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
    </Modal>
  );
};

export default FilterModal;
