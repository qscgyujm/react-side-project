import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  height: 200px;
  /* left:0; right:0;
  top:0; bottom:0; */
	/* margin: auto; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* margin: auto; */
`;

const Wrapper = styled.div`
  /* margin: auto; */
  padding: 30px;
  background-color: #000;
  color: #FFF;
  font-size: 30px;
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
