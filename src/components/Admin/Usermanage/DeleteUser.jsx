import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { deleteUser } from '../../../services/apiServices'; // Import hàm deleteUser từ apiServices

const DeleteUser = ({ user, show, handleClose, updateUserList }) => {
    if (!user) {
        return null; // Xử lý trường hợp user không tồn tại
    }

    const { id, name } = user;

    const handleDeleteUser = async () => {
        try {
            await deleteUser(id); // Gọi hàm deleteUser để xóa user
            updateUserList(); // Gọi hàm updateUserList để cập nhật danh sách người dùng sau khi xóa thành công
            handleClose(); // Đóng modal sau khi xóa thành công
        } catch (error) {
            console.error('Error deleting user:', error);
            // Xử lý lỗi xóa user (nếu cần)
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete user: <strong>{name}</strong> (ID: {id})?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteUser}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUser;
