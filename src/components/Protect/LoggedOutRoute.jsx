import React from 'react'
import { Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux'

import Nav from '../Nav';

const ProtectRoute = ({ 
  component: BaseComponent,
  ...rest
}) => {
  console.log('out', BaseComponent, rest);
  const history = useHistory();
  const { isAuth } = rest;

  if(isAuth) {
    history.push('/product');
  }

  return(
    <Route
      render={rest => (
        <>
          <Nav />
          <BaseComponent 
            {...rest}
          />
        </>
      )}
    />
  )
}

const mapStateToProps = (state) => {
  return state.auth;
}

export default connect(mapStateToProps)(ProtectRoute);
