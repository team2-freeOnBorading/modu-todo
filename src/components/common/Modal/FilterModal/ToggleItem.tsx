import React from 'react';
import styled from 'styled-components';
import { Priority, Status } from 'type';

interface IToggleItem<T> {
  value: T;
  isActive: boolean;
  onClick: (value: React.MouseEvent<HTMLElement>) => void;
}

const ToggleItem: React.FC<IToggleItem<Priority | Status>> = ({ value, isActive, onClick }) => {
  return (
    <Item isActive={isActive} onClick={onClick} id={value}>
      {value}
    </Item>
  );
};

interface IItem {
  isActive: boolean;
}

const Item = styled.div<IItem>`
  background-color: ${({ isActive }) => {
    return isActive ? 'white' : 'grey';
  }};
`;

export default ToggleItem;
