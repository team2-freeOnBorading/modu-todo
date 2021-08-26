import React from 'react';
import styled from 'styled-components';
import SortSelectorItem from './SortSelectorItem';

interface ISortSelectorList {
  info: string;
  activeOption: null | string;
  optionList: string[];
  handleSort: (key: string, option: string | null) => void;
}

const SortSelectorList: React.FC<ISortSelectorList> = ({ info, activeOption, optionList, handleSort }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { id } = e.target;
    id === 'null' ? handleSort(info, null) : handleSort(info, id);
  };
  return (
    <Wrapper>
      {info}
      <SelectorItemListWrapper>
        <SortSelectorItem name={info} id='null' isActive={activeOption === null} onChange={onChange} />
        {optionList.map((item, index) => {
          return <SortSelectorItem name={info} id={item} key={index} isActive={activeOption === item} onChange={onChange} />;
        })}
      </SelectorItemListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 6px;
`;

const SelectorItemListWrapper = styled.div`
  display: flex;
  padding-top: 12px;
  justify-content: space-around;
`;
export default SortSelectorList;
