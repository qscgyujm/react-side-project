import React from 'react'
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  width: calc(100vw - 100px);
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const animation = keyframes`
  from {
    color: #FFF;
    background-color: #000;
  }

  to {
    color: #000;
    background-color: #FFF;
  }
`

export const Wrapper = styled.div`
  border-radius: 25px;
  padding: 30px;
  font-size: 30px;
  animation: ${animation}  2s linear infinite;
`;

const index = () => {
  return (
    <Container>
      <Wrapper>
        Loading
      </Wrapper>
    </Container>
  )
}

export default index
