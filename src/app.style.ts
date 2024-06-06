import styled from 'styled-components';

export const Nav = styled.main`
  margin: 20px auto;
  width: 85%;
  background: #dde1e7;
  h4 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
      'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  h4::first-letter {
    color: #3e98c7;
    font-size: 2em;
  }
`;

export const Main = styled.main`
  margin: 10px auto;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  width: 90%;
  box-sizing: border-box;
  gap: 10px;
  max-width: 900px;
  min-height: 80vh;
  /* background: lightgreen; */
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 0.2fr 1fr;
  .header {
    /* background: red; */
    height: 70px;
    display: flex;
    align-items: center;
  }
  .list {
    /* background: green; */
    grid-row: 2/3;
  }
  .side {
    /* background-color: coral; */
    grid-row: 1/3;
    align-content: center;
    align-self: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    .side {
      grid-row: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .header,
    .side,
    .list {
      grid-column: 1/3;
    }
  }
`;

export const Button = styled.button`
  all: unset;
  padding: 7px;
  background: #dde1e7;
  border-radius: 100px;
  color: #3e98c7;
  margin: 0px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45),
      inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
`;
export const Card = styled.div`
  padding: 10px 5px;
  margin: 10px 5px;
  border-radius: 4px;
  text-align: none;

  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45),
    5px 5px 9px rgba(94, 104, 121, 0.3);

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  background: #dde1e7;
  div {
    display: flex;
    align-items: center;
  }
  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45),
      inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
  a {
    text-decoration: none;
    color: #000;
    display: block;
    /* background: red; */
    width: 100%;
  }
`;

export const Container = styled.div`
  /* background: red; */
  padding: 5px;
  margin: 5px;
  border-radius: 2px;
`;
export const Input = styled.input`
  background: #dde1e7;
  box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45),
    inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  border-radius: 0%;
  border: none;
  padding: 10px 20px;
  height: 30px;
  border-radius: 70px;
  color: #000;
  outline: none;
  font-size: medium;
  width: 60%;
`;
export const Select = styled.select`
  background: #dde1e7;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45),
      inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
  border-radius: 0%;
  border: none;
  padding: 10px;
  border-radius: 70px;
  outline: none;
  color: #000;
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
