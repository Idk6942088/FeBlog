import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from "reactstrap";
import { FaBlog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";
import { extractUrlAndId } from "../utility/utils";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logoutUser } = useContext(UserContext);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
        !user && setAvatar(null)
    },[user,user?.photoURL]);

    console.log(user);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar
                fixed="top"
                expand="md"
                className="menu"
                style={{
                    borderBottom: "1px solid gray",
                    backgroundColor: "rgb(171, 169, 38)",
                }}
            >
                <NavbarBrand href="/">
                    <FaBlog />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/">
                                Főoldal
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink className="nav-link" to="/posts">
                                Posztok
                            </NavLink>
                        </NavItem>
                        {user && (
                            <NavItem>
                                <NavLink className="nav-link" to="/create">
                                    Új bejegyzés
                                </NavLink>
                            </NavItem>
                        )}
                    </Nav>
                    {/* authorizáció*/}
                    <Nav navbar>
                        {!user ? (
                            <>
                                <NavItem>
                                    <NavLink className="nav-link" to="/auth/in">
                                        Belépés
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/auth/up">
                                        Regisztráció
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink
                                        className="nav-link"
                                        to="/"
                                        onClick={() => logoutUser()}
                                    >
                                        Kijelentkezés
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {avatar ? (
                                            <img
                                                className="myavatar"
                                                src={avatar}
                                                alt=""
                                            />
                                        ) : (
                                            <RxAvatar
                                                title={user.displayName}
                                            />
                                        )}
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        <DropdownItem>
                                            <NavLink
                                                className="nav-link"
                                                to="/profile"
                                            >
                                                {" "}
                                                Személyes adatok
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
            <Outlet />
        </div>
    );
};
