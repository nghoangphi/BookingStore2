import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiServices';

const ModalUpdateUser = ({ show, setShow, dataUpdate, updateUserInList }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [credit, setCredit] = useState('');
    const [role, setRole] = useState('USER');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (dataUpdate) {
            setEmail(dataUpdate.email || '');
            setPhone(dataUpdate.phone || '');
            setName(dataUpdate.name || '');
            setCredit(dataUpdate.credit || '');
            setRole(dataUpdate.role || 'USER');
            setDate(dataUpdate.date || '');
        }
    }, [dataUpdate]);

    const handleSubmitUpdateUser = async () => {
        try {
            const updatedUser = {
                ...dataUpdate,
                name,
                credit,
                role,
                date,
            };

            await putUpdateUser(dataUpdate.id, updatedUser); // Pass updatedUser object
            toast.success('User updated successfully');
            updateUserInList(updatedUser); // Update user in ManageUser list

            handleClose();
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user');
        }
    };

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const resetForm = () => {
        setEmail('');
        setPhone('');
        setName('');
        setCredit('');
        setRole('USER');
        setDate('');
    };

    return (
        <Modal
            backdrop="static"
            show={show}
            onHide={handleClose}
            className="modal-add-user"
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            placeholder="Ex:nguyenvana@gmail.com"
                            className="form-control"
                            disabled
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Credit</label>
                        <input
                            type="text"
                            className="form-control"
                            value={credit}
                            onChange={(event) => setCredit(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="+84"
                            disabled
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitUpdateUser}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUpdateUser;
