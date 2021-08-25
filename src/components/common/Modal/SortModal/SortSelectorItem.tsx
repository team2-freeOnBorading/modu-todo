import React from 'react';
import styled from 'styled-components';

interface ISortSelectorItem {
  value: string;
  isActive: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortSelectorItem: React.FC<ISortSelectorItem> = ({ value, isActive, onChange }) => {
  return (
    <SelectorItem>
      <RadioButtonItem type='radio' name={value} checked={isActive} onChange={onChange} />
      {value}
    </SelectorItem>
  );
};

const SelectorItem = styled.div``;

const RadioButtonItem = styled.input``;

export default SortSelectorItem;
