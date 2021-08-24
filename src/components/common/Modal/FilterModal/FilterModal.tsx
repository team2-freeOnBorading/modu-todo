import React, { useState } from 'react';
import { Priority, Status } from 'type';
import Modal, { ModalProps } from '../Modal';

const mockFilterOption: any = {
  status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED],
  priority: [Priority.LOW, Priority.MEDIUM, Priority.HIGH],
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

const FilterModal: React.FC<FilterModalProps> = ({ filterOptions = mockFilterOption, visible, onClose }) => {
  const [filter, setFilter] = useState<IFilterOptions>(filterOptions);

  return (
    <Modal visible={visible} onClose={onClose}>
      <div>FilterModal</div>
    </Modal>
  );
};

export default FilterModal;
