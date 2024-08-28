import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => (props.active ? "#3f51b5" : "#e8eaf6")};
  color: ${(props) => (props.active ? "#ffffff" : "#3f51b5")};
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => (props.active ? "#3f51b5" : "#c5cae9")};
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;
