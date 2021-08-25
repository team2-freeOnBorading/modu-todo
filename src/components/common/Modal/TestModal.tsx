import React, { useState } from 'react';
import FilterModal from './FilterModal';

const TestModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const onClose = () => setModalVisible(false);
  const popUpModal = () => setModalVisible(true);
  return (
    <>
      <button onClick={popUpModal}>
        <svg xmlns='http://www.w3.org/2000/svg' height='48' viewBox='0 0 48 48' width='48'>
          <path d='M6 36h12v-4h-12v4zm0-24v4h36v-4h-36zm0 14h24v-4h-24v4z' />
          <path d='M0 0h48v48h-48z' fill='none' />
        </svg>
      </button>
      <FilterModal visible={modalVisible} onClose={onClose} children={<div>modal</div>} />
    </>
  );
};

export default TestModal;
