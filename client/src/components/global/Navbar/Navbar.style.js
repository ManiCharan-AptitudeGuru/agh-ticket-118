import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background-color: #3f51b5;
  padding: 0.5rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Logo = styled(Link)`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #3f51b5;
    padding: 1rem;
  }
`;

export const NavItem = styled.li``;

export const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
