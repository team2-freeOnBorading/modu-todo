import React from 'react';
import { ITodo } from 'type';
import Modal, { IModal } from '../Modal';

interface IDetailModal extends IModal {
  item: ITodo;
}

const DetailModal: React.FC<IDetailModal> = ({ item, visible, onClose }) => {
  return <div></div>;
};

export default DetailModal;
