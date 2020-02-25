import React from 'react';


const WithWrapper = (
  Wrapper,
) =>(
  BaseComponent,
) => (props) => {

  return (
    <Wrapper>
      <BaseComponent 
        {...props}
      />
    </Wrapper>
  )
}

export default WithWrapper
