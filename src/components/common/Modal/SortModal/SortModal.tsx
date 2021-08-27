import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { IModal } from '../Modal';
import ModalRadioForm from '../Form/ModalRadioForm';
import { ApplyButton } from '../Button';

export interface ISortOption {
  //state작업시 해당 interface 참고해 작업
  sortBy: null | string; // 정렬기준
  order: 'DESC' | 'ASC'; // type으로 빼는게? 각각 내림차순 | 오름차순
}

export interface ISortModal extends IModal {
  sortOptions?: ISortOption;
}

const mockSortOption: ISortOption = {
  sortBy: 'deadLine',
  order: 'ASC',
};

//마감일, 수정일, 중요도
const sortByOptionList: string[] = ['deadLine', 'updateDate', 'priority']; //priority 옵션 우선순위는 추후 추가
//내림차순, 오름차순
const orderOptionList: ('DESC' | 'ASC')[] = ['DESC', 'ASC'];

const SortModal: React.FC<ISortModal> = ({ sortOptions = mockSortOption, visible, onClose }) => {
  const [sort, setSort] = useState<ISortOption>(sortOptions);
  const handleSort = (key: string, option: string | null) => {
    setSort((prev) => {
      return { ...prev, [key]: option };
    });
  };
  const applySort = () => {
    console.log(sort);
    // setFilter code: apply(sort)
    // sort state 전역 적용
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Wrapper>
        <ModalRadioForm
          isNullOption
          optionKey='sortBy'
          headerText='정렬기준'
          activeOption={sort.sortBy}
          optionList={sortByOptionList}
          handleValue={handleSort}
        />
        <ModalRadioForm optionKey='order' headerText='정렬순서' activeOption={sort.order} optionList={orderOptionList} handleValue={handleSort} />
        <ApplyButton onClick={applySort}>Apply</ApplyButton>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 400px;
`;

export default SortModal;
