import SideBar from "./Sidebar/SideBar";
import './Admin.scss';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars, FaBell } from 'react-icons/fa';
import { IoDiamondOutline } from "react-icons/io5";
import profileImage from '../../assets/gaixinh.jpg';
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import React from "react";
import ReactFlagsSelect from "react-flags-select";

import { Nav, NavDropdown } from "react-bootstrap";
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false); // dung de thay doi trang thai nut Menu
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDropdownToggle = () => {
        setShowDropdown(true);
    };
    useEffect(() => {
        console.log('showDropdown:', showDropdown);
    }, [showDropdown]);
    console.log("vl", showDropdown)
    const handleLogout = () => {
        // Xử lý logout ở đây
        setShowDropdown(false); // Đóng dropdown sau khi logout
    };
    const [selected, setSelected] = useState("");
    const handleLanguageSelect = (countryCode) => {
        setSelected(countryCode);
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />


                    <div className="header-right">
                        <button className="upgrade-button">
                            <IoDiamondOutline className="diamond-icon" />
                            Upgrade
                        </button>
                        <div className="flags-country">
                            <ReactFlagsSelect
                                selectedSize={13}
                                disabled={false}
                                defaultCountry="GB"
                                selected={selected}
                                onSelect={handleLanguageSelect}
                                countries={["US", "GB", "JP", "RS", "DE", "VN"]}
                                customLabels={{ US: "United State", GB: "English", JP: "Japan", FR: "France", DE: "German", VN: "VietNam" }}
                                placeholder="Select Language"
                            />
                        </div>

                        <div className="notification-icon">
                            <FaBell className="bell-icon" />
                            <span className="notification-count">10</span>
                        </div>

                        <div className="profile-dropdown" >



                            {/* Dropdown menu */}
                            <Nav>
                                <img src={profileImage} alt="Profile" className="profile-image" />

                                <NavDropdown title="Hi, I'm Admin" id="basic-nav-dropdown">
                                    <NavDropdown.Item >Edit Profile</NavDropdown.Item>
                                    <NavDropdown.Item >Change Password</NavDropdown.Item>
                                    <span className="">Vendor Dashboard</span>
                                    <NavDropdown.Item >Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item ><FaHome />Homepage</NavDropdown.Item>
                                    <NavDropdown.Item ><IoLogOutSharp />Logout</NavDropdown.Item>

                                </NavDropdown>
                            </Nav>
                        </div>

                    </div>

                </div>


                <div className="admin-main">
                    <Outlet />

                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />

        </div >
    )
}
export default Admin;