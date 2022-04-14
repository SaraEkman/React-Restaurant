import styled from 'styled-components'

export const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background-color: rgb(240, 247, 250);
  border: 2px inset rgb(0, 51, 78);
  width: 90%;
  margin: auto;
  padding: 8px;
  margin-top: 10px;
  transform: translateY(30%);

  @media only screen and (min-width: 600px) {
    width: 60%;
    min-height: 500px;
    transform: translateY(15%);
  }
`
