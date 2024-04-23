import React, { useState, useEffect } from 'react';
import TableUser from './TableUser';
import ModalCreateUser from './ModalCreateUser';
import ModalUpdateUser from './ModalUpdateUser';
import DeleteUser from './DeleteUser';
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../../services/apiServices';
import { CSVLink, CSVDownload } from "react-csv";
import { FaCloudDownloadAlt } from "react-icons/fa";

const ManageUser = () => {
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [listUsers, setListUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedRole, setSelectedRole] = useState(''); // State to track selected role
    const { data, refetch } = useQuery({
        queryKey: 'users',
        queryFn: getAllUsers,
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setListUsers(data);
        }
    }, [data]);

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    };

    const updateUserList = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error('Error updating user list:', error);
        }
    };

    const handleShowDeleteModal = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleSearchUser = () => {
        let filteredUsers = data;

        // Apply role filter if a role is selected
        if (selectedRole) {
            filteredUsers = filteredUsers.filter(user => user.role === selectedRole);
            console.log(filteredUsers)
        }

        // Apply keyword filter if searchKeyword is provided
        if (searchKeyword.trim()) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }

        setListUsers(filteredUsers);
    };
    const csvData = [
        ["ID", "Name", "Email", "Credit", "Phone", "Role", "Date"],
        ...listUsers.map(user => [user.id, user.name, user.email, user.credit, user.phone, user.role, user.date])
    ];

    return (
        <div className="manage-user-container">
            <div className="title">All Users</div>
            <div className="users-content">
                <div
                    style={{ gap: "8px" }}
                    className="user-addexp">

                    <div className="btn-add-new">
                        <button

                            className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>
                            <FcPlus /> Add new users
                        </button>
                    </div>
                    <div className="btn-export">
                        <CSVLink
                            filename={"my-file.csv"}
                            className="btn btn-warning"

                            data={csvData}> <FaCloudDownloadAlt /> Export to excel</CSVLink>

                    </div>

                </div>
                <div className="user-find">
                    <div className="bulk-action">
                        <select>
                            <option value="bulkAction">Bulk Action</option>
                            <option value="delete">Delete</option>
                        </select>
                        <button className="apply-btn">Apply</button>
                    </div>
                    <div className="user-filter">
                        <select className="select-role" onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="">--Select--</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Search user..."
                        />
                        <button className="search-btn" onClick={handleSearchUser}>
                            Search User
                        </button>
                    </div>
                </div>
                <div className="table-users-container">
                    <TableUser
                        data={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleShowDeleteModal={handleShowDeleteModal}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    listUsers={listUsers}
                    setListUsers={setListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    updateUserInList={updateUserList}
                />
                <DeleteUser
                    user={selectedUser}
                    show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    updateUserList={updateUserList}
                />
            </div>
        </div >
    );
};

export default ManageUser;
