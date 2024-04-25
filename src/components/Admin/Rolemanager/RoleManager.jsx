import React from 'react';
import './Rolemanager.scss';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const RoleManager = (props) => {

    return (
        <div className="manage-user-container">

            <div className="users-content">
                <div
                    style={{ gap: "8px" }}
                    className="user-addexp">
                    <div className="title">Role</div>
                    <div className="btn-verify">
                        <button

                            className="btn btn-warning" >
                            <IoIosCheckmarkCircleOutline />
                            Verify configs
                        </button>
                    </div>
                    <div className="btn-matrix">
                        <button

                            className="btn btn-info" >
                            Permission Matrix
                        </button>
                    </div>
                    <div className="btn-addnew">
                        <button

                            className="btn btn-primary" >
                            Add new role
                        </button>
                    </div>

                </div>
                <div className="user-find">


                </div>




            </div>
        </div >
    );

}
export default RoleManager;