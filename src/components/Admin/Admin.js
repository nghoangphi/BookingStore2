import SideBar from "./SideBar";
import './Admin.scss';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars, FaBell } from 'react-icons/fa';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { RiFlag2Line } from 'react-icons/ri';
import { IoDiamondOutline } from "react-icons/io5";
import profileImage from '../../assets/gaixinh.jpg';
import { useEffect } from "react";
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

                        <select className="language-select">
                            <option value="english">
                                <RiFlag2Line className="flag-icon" />
                                ENGLISH
                            </option>
                            <option value="japan">
                                <RiFlag2Line className="flag-icon" />
                                JAPAN
                            </option>
                            <option value="french">
                                <RiFlag2Line className="flag-icon" />
                                FRENCH
                            </option>
                        </select>

                        <div className="notification-icon">
                            <FaBell className="bell-icon" />
                            <span className="notification-count">10</span>
                        </div>

                        <div className="profile-dropdown" >



                            {/* Dropdown menu */}
                            <Nav>
                                <img src={profileImage} alt="Profile" className="profile-image" />

                                <NavDropdown title="Hi, I'm Admin" id="basic-nav-dropdown">
                                    <NavDropdown.Item >Login</NavDropdown.Item>
                                    <NavDropdown.Item >
                                        Logout
                                    </NavDropdown.Item>
                                    <NavDropdown.Item >Profile</NavDropdown.Item>

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

        </div>
    )
}
export default Admin;