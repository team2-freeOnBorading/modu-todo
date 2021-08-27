import Modal, { IModal } from '../Modal';

interface IConfirmModal extends IModal {
  text?: string;
}

const ConfirmModal: React.FC<IConfirmModal> = ({ visible, onClose, text = '할일을 입력해주세요 📝' }) => {
  return (
    <Modal visible={visible} onClose={onClose} zIndex={200}>
      {text}
    </Modal>
  );
};
export default ConfirmModal;
