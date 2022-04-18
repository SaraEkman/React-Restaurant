import styled from 'styled-components'

export const Button = styled.button`
  background-color: rgb(0, 51, 78);
  height: 4em;
  width: 10em;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  text-transform: uppercase;
  font-family: 'Cinzel', serif;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.5s;
  
  &:hover {
    background-color: rgb(20, 83, 116);
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.5s;
  }
`
