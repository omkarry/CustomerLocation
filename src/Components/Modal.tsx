import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Customer } from '../App';

interface Props {
  show: boolean;
  closeModal: () => void;
  selectedCust: Customer | null;
}

const ModalDetails: React.FC<Props> = ({ show, closeModal, selectedCust }) => {

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedCust?.firstName} {selectedCust?.lastName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Email: {selectedCust?.email}</p>
        <p>Phone: {selectedCust?.phone}</p>
        <p>City: {selectedCust?.customerAddress?.city}</p>
        <p>State: {selectedCust?.customerAddress?.state}</p>
        <p>Zipcode: {selectedCust?.customerAddress?.zipCode}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetails;