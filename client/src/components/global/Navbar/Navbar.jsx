import React, { useState } from "react";
import {
  Nav,
  NavContent,
  Logo,
  MenuButton,
  NavList,
  NavItem,
  NavLink,
} from "./Navbar.style";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Nav>
      <NavContent>
        <Logo to="/">Admin Panel</Logo>
        <MenuButton onClick={toggleMenu}>☰</MenuButton>
        <NavList isOpen={isOpen}>
          <NavItem>
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/reports" onClick={() => setIsOpen(false)}>
              Reports
            </NavLink>
          </NavItem>
        </NavList>
      </NavContent>
    </Nav>
  );
}

export default NavBar;
