import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import ViewUser from './ViewUser';
import DeleteUser from './DeleteUser'; // Ensure DeleteUser component is imported
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManageUser.scss';

const TableUser = (props) => {
    const { data, handleClickBtnUpdate, handleShowDeleteModal } = props;
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [emailVerifiedMap, setEmailVerifiedMap] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Define showDeleteModal state

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);

    const handleVerifyEmail = (userId) => {
        const updatedMap = { ...emailVerifiedMap };
        updatedMap[userId] = true;
        setEmailVerifiedMap(updatedMap);

        toast.success('Email verified successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
        });
    };

    const handleUnverifyEmail = (userId) => {
        const updatedMap = { ...emailVerifiedMap };
        updatedMap[userId] = false;
        setEmailVerifiedMap(updatedMap);

        toast.error('Email verification removed!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
        });
    };

    return (
        <>
            {data && data.length > 0 ? (
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Credit</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Role</th>
                            <th scope="col">Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={`table-user-${index}`}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>
                                    {user.email}
                                    {emailVerifiedMap[user.id] ? (
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '5px' }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faInfoCircle} style={{ color: 'gold', marginLeft: '5px' }} />
                                    )}
                                </td>
                                <td>{user.credit}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>{user.date}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link" id={`dropdown-button-${index}`}>
                                            <FontAwesomeIcon icon={faBars} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleViewUser(user)}>View</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleClickBtnUpdate(user)}>Update</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleShowDeleteModal(user)}>Delete</Dropdown.Item>
                                            {emailVerifiedMap[user.id] ? (
                                                <Dropdown.Item onClick={() => handleUnverifyEmail(user.id)}>
                                                    Unverify Email
                                                </Dropdown.Item>
                                            ) : (
                                                <Dropdown.Item onClick={() => handleVerifyEmail(user.id)}>
                                                    Verify Email
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No users found.</div>
            )}

            <ViewUser user={selectedUser} show={showViewModal} handleClose={handleCloseViewModal} />

            <DeleteUser
                user={selectedUser}
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleDelete={(userId) => {
                    console.log('Delete user with ID:', userId);
                    // Perform delete operation here
                    setShowDeleteModal(false); // Close modal after deletion
                }}
            />
        </>
    );
};

export default TableUser;
