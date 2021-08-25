import React from 'react';
import styled from 'styled-components';
import SortSelectorItem from './SortSelectorItem';

interface ISortSelectorList {
  info: string;
  activeOption: string;
  optionList: string[];
  handleSort: (key: string, option: string) => void;
}

const SortSelectorList: React.FC<ISortSelectorList> = ({ info, activeOption, optionList, handleSort }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { name } = e.target;
    handleSort(info, name);
  };
  return (
    <Wrapper>
      {info}
      <SelectorItemListWrapper>
        {optionList.map((item, index) => {
          return <SortSelectorItem value={item} key={index} isActive={activeOption === item} onChange={onChange} />;
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
