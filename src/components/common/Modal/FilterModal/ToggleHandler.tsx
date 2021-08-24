import React, { useState } from 'react';
import styled from 'styled-components';
import { Priority, Status } from 'type';
import ToggleItem from './ToggleItem';

interface ToggleHandler<T> {
  info: string;
  toggleList: T[];
  activeList: T[];
  handleFilter: (key: string, option: T[]) => void;
}

const ToggleHandler: React.FC<ToggleHandler<Priority | Status>> = ({ toggleList, activeList, info, handleFilter }) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const targetToggleItem = e.currentTarget.id as Priority | Status;
    console.log(activeList.some((value) => value === targetToggleItem));
    const newActiveList: (Priority | Status)[] = activeList.some((value) => value === targetToggleItem)
      ? [...activeList].filter((item) => item !== targetToggleItem)
      : [...activeList, targetToggleItem];
    console.log(newActiveList);
    handleFilter(info, newActiveList);
  };
  return (
    <ToggleHandlerContainer>
      {info}
      <ToggleItemListContainer>
        {toggleList.map((item, index) => {
          const isActive = activeList.some((value) => value === item);
          return <ToggleItem key={index} value={item} isActive={isActive} onClick={onClick} />;
        })}
      </ToggleItemListContainer>
    </ToggleHandlerContainer>
  );
};

const ToggleHandlerContainer = styled.div``;

const ToggleItemListContainer = styled.div`
  display: flex;
`;

export default ToggleHandler;
