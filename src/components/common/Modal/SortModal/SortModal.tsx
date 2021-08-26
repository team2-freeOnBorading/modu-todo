import { useTodoAndDispatchContext } from 'context/TodoContext';
import React, { useState } from 'react';
import styled from 'styled-components';
import { OrderType } from 'type';
import Modal, { IModal } from '../Modal';
import SortSelectorList from './SortSelectorList';

export interface ISortOption {
  sortBy: null | string;
  order: OrderType;
}

export interface ISortModal extends IModal {
  sortOptions?: ISortOption;
}

const mockSortOption: ISortOption = {
  sortBy: 'updatedAt',
  order: 'DESC',
};

const sortByOptionList: string[] = ['deadLine', 'updatedAt']; //priority 옵션 우선순위는 추후 추가
const orderOptionList: ('DESC' | 'ASC')[] = ['DESC', 'ASC'];

const SortModal: React.FC<ISortModal> = ({ sortOptions = mockSortOption, visible, onClose }) => {
  const [sort, setSort] = useState<ISortOption>(sortOptions);
  const { dispatch } = useTodoAndDispatchContext();
  const handleSort = (key: string, option: string | null) => {
    setSort((prev) => {
      return { ...prev, [key]: option };
    });
  };
  const applySort = () => {
    dispatch({ type: 'SORT', sort: sort });
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Wrapper>
        <SortSelectorList info={'sortBy'} activeOption={sort.sortBy} optionList={sortByOptionList} handleSort={handleSort} />
        <SortSelectorList info={'order'} activeOption={sort.order} optionList={orderOptionList} handleSort={handleSort} />
        <ApplyButton onClick={applySort}>Apply</ApplyButton>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  position: relative;
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
export default SortModal;
