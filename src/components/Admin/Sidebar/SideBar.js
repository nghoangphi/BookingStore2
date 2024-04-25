import 'react-pro-sidebar/dist/css/styles.css';
import { GoFileMedia } from "react-icons/go";
import { FaPager } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaTachometerAlt } from 'react-icons/fa';
import sidebarBg from '../../../assets/anh2.jpg';
import { HiUsers } from "react-icons/hi";
import { GrUserSettings } from "react-icons/gr";

import { Link } from 'react-router-dom';
const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            color: 'black',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 18,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        BOOKING CORE 3.6.0
                    </div>
                </SidebarHeader>

                <SidebarContent style={{ color: 'white' }}>
                    <span className="badge red">CONTENT</span>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        // suffix={<span className="badge red">New</span>}
                        >
                            News
                        </MenuItem>
                        <MenuItem icon={<FaPager />
                        }> Page </MenuItem>
                        <MenuItem icon={<GoFileMedia />
                        }> Admin
                            <Link to="/admins"> </Link>
                        </MenuItem>
                    </Menu>
                    <span className="badge red">SYSTEM</span>

                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>}
                            icon={<HiUsers />
                            }
                            title={"Users"}

                        >

                            <MenuItem icon={<GrUserSettings />}> All Users
                                <Link to="/admins/manage-users"> </Link>
                            </MenuItem>
                            <MenuItem> Role Manager</MenuItem>
                            <MenuItem> Subcribers</MenuItem>
                            <MenuItem suffix={<span className="badge yellow">1</span>}> Upgrade Request</MenuItem>
                            <MenuItem> Verification Request</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent >

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://www.facebook.com/phihoangnguyen.192"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook className='text-primary' />

                            <span className='text-primary' style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                PHIHOANG
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar >
        </>
    )
}

export default SideBar;