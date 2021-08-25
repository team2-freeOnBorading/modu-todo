import React from 'react';
import Modal, { ModalProps } from '../Modal';

export interface ISortOption {
  sortBy: string;
  order: 'DESC' | 'ASC'; // type으로 빼는게?
}

export interface ISortModal extends ModalProps {
  sortOptions?: ISortOption;
}

const mockSortOption: ISortOption = {
  sortBy: 'updateDate',
  order: 'DESC',
};

const SortModal: React.FC<ISortModal> = ({ sortOptions = mockSortOption, visible, onClose }) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      sort
    </Modal>
  );
};

export default SortModal;
