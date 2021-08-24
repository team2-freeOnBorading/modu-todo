import React, { useState } from 'react';
import {Status}  from 'type'
import Modal, { ModalProps } from './Modal';

const mockFilterOption: any = { 
  status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED]

};

export interface FilterModalProps extends ModalProps {
  filterOptions?: any;
}

const FilterModal: React.FC<FilterModalProps> = ({ filterOptions = mockFilterOption, visible, onClose }) => {
  const [filter, setFilter] = useState(filterOptions);
  return (
    <Modal visible={visible} onClose={onClose}>
      <div>FilterModal</div>
    </Modal>
  );
};

export default FilterModal;
