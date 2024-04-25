import { Button, Modal } from 'react-bootstrap';

import styles from '../styles/UniversalModal.module.css';

const CustomAlert = ({ show, handleClose, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered className={`bg-dark`}>
      <Modal.Header closeButton className={`bg-dark ${styles.modalHeader}`}>
        <Modal.Title>Пример кастомного оповещения</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-dark text-center ${styles.modalText}`}>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer className={`bg-dark ${styles.modalFooter}`}>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomAlert;
