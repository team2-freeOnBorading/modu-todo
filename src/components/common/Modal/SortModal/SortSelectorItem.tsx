import React from 'react';
import styled from 'styled-components';

interface ISortSelectorItem {
  value: string;
  isActive: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortSelectorItem: React.FC<ISortSelectorItem> = ({ value, isActive, onChange }) => {
  const labelText = (value: string) => {
    switch (value) {
      case 'DESC':
        return '내림차순';
      case 'ASC':
        return '오름차순';
      case 'deadLine':
        return '마감일 기준';
      case 'updateDate':
        return '수정일 기준';
      default:
        return value;
    }
  };

  return (
    <SelectorItem>
      <RadioButtonItem type='radio' name={value} checked={isActive} onChange={onChange} />
      <LabelText isActive={isActive}>{labelText(value)}</LabelText>
    </SelectorItem>
  );
};

interface IItemText {
  isActive: boolean;
}

const SelectorItem = styled.div`
  display: flex;
  padding: 3px;
`;

const RadioButtonItem = styled.input`
  margin-right: 12px;
  &[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    padding: 3px;
    background-clip: content-box;
    border: 2px solid #bbbbbb;
    background-color: #e7e6e7;
    border-radius: 50%;
  }
  &[type='radio']:checked {
    background-color: #8ee5c2;
  }
`;

const LabelText = styled.span<IItemText>`
  color: ${({ isActive }) => (isActive ? 'black' : '#aaa')};
`;

export default SortSelectorItem;
