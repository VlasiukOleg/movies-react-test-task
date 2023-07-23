import styled from 'styled-components';

export const Movies = styled.ul`
  list-style: none;
  margin: 10px auto;
  padding: 0;
  max-width: 380px;
`;

export const MoviesItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
  border-bottom: 1px solid black;

  div {
    display: flex;
    align-items: center;
  }
`;