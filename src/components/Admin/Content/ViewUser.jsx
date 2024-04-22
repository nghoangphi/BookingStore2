import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ViewUser = ({ user, show, handleClose }) => {
    if (!user) {
        return null; // Return null or handle the case when user is null
    }

    const { id, name, email, credit, phone, role, date } = user;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Credit:</strong> {credit}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Role:</strong> {role}</p>
                <p><strong>Date:</strong> {date}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewUser;
