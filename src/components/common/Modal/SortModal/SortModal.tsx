import React, { useState } from 'react';
import Modal, { IModal } from '../Modal';
import SortSelectorList from './SortSelectorList';

export interface ISortOption {
  sortBy: string;
  order: 'DESC' | 'ASC'; // type으로 빼는게?
}

export interface ISortModal extends IModal {
  sortOptions?: ISortOption;
}

const mockSortOption: ISortOption = {
  sortBy: 'updateDate',
  order: 'DESC',
};

//마감일, 수정일, 중요도
const sortByOptionList: string[] = ['deadLine', 'updateDate', 'priority'];
//내림차순, 오름차순
const orderOptionList: ('DESC' | 'ASC')[] = ['DESC', 'ASC'];

const SortModal: React.FC<ISortModal> = ({ sortOptions = mockSortOption, visible, onClose }) => {
  const [sort, setSort] = useState<ISortOption>(sortOptions);

  const handleSort = (key: string, option: string) => {
    setSort((prev) => {
      return { ...prev, [key]: option };
    });
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <SortSelectorList info={'sortBy'} activeOption={sort.sortBy} optionList={sortByOptionList} handleSort={handleSort} />
      <SortSelectorList info={'order'} activeOption={sort.order} optionList={orderOptionList} handleSort={handleSort} />
    </Modal>
  );
};

export default SortModal;
