import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCheckSquare, faSquare, faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import ViewUser from './ViewUser';
import DeleteUser from './DeleteUser'; // Ensure DeleteUser component is imported
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManageUser.scss';
import ReactPaginate from 'react-paginate'; // Import the react-paginate component

const TableUser = (props) => {
    const { data, handleClickBtnUpdate, handleShowDeleteModal } = props;
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [emailVerifiedMap, setEmailVerifiedMap] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Define showDeleteModal state
    const [checkedUsers, setCheckedUsers] = useState(new Set()); // Set to track checked users
    const [selectAll, setSelectAll] = useState(false); // State to track if select all is checked

    useEffect(() => {
        // Reset checked users when data changes
        setCheckedUsers(new Set());
        setSelectAll(false);
    }, [data]);

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

    const handleToggleCheckbox = (userId) => {
        const newCheckedUsers = new Set(checkedUsers);
        if (newCheckedUsers.has(userId)) {
            newCheckedUsers.delete(userId);
        } else {
            newCheckedUsers.add(userId);
        }
        setCheckedUsers(newCheckedUsers);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setCheckedUsers(new Set());
        } else {
            const allUserIds = data.map((user) => user.id);
            setCheckedUsers(new Set(allUserIds));
        }
        setSelectAll(!selectAll);
    };
    const [currentPage, setCurrentPage] = useState(0); // Add a new state variable for the current page

    const PER_PAGE = 15; // Set the number of users per page

    const offset = currentPage * PER_PAGE;

    const pageCount = Math.ceil(data.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        <>
            {data && data.length > 0 ? (
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">
                                <FontAwesomeIcon
                                    style={{ color: "#74b7fa" }}
                                    icon={selectAll ? faCheckSquare : faSquare}
                                    onClick={handleSelectAll}
                                />
                            </th>
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
                        {data
                            .slice(offset, offset + PER_PAGE)
                            .map((user, index) => (
                                <tr key={`table-user-${index}`}>
                                    <td>
                                        <FontAwesomeIcon style={{ color: "#74b7fa" }}

                                            icon={checkedUsers.has(user.id) ? faCheckSquare : faSquare}
                                            onClick={() => handleToggleCheckbox(user.id)}
                                        />
                                    </td>
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
                    <div className='paginate'>
                        <ReactPaginate

                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                        />
                    </div>
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
