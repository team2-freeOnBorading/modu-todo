import React, { useState } from 'react';
import Modal, { ModalProps } from '../Modal';
import SortOptionHandler from './SortOptionHandler';

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

const sortOptionList: string[] = ['deadLine, updateDate', 'priority'];

const orderOptionList: ('DESC' | 'ASC')[] = ['DESC', 'ASC'];

const SortModal: React.FC<ISortModal> = ({ sortOptions = mockSortOption, visible, onClose }) => {
  const [sort, setSort] = useState<ISortOption>(sortOptions);

  const handleSort = (key: string, option: string) => {
    setSort((prev) => {
      return { ...prev, [key]: option };
    });
  };

  return <Modal visible={visible} onClose={onClose}></Modal>;
};

export default SortModal;
