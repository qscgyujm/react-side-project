import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { action as authAction } from '../../redux/auth';

import withWrapper from '../../hoc/withWrapper';

import { media } from '../../helper/media';

import iconSrc from '../../img/logo192.png';

import LoggedInNav from './view/LoggedInNav'

const NavContainer = styled.div`

  ${media.tablet`
    display: none;
  `}
`;

const NavWrapper = styled.div`
  height: 50px;
  background-color: #000C;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  position: relative;
`;

const Icon = styled.img`
  height: 30px;
  width: 30px;
`;

const SignupWrapper = styled.div`
  position: absolute;
  right: 50px;
`;

const RegisterTag = styled.div`
  color: #FFF;
  font-size: 16px;
  cursor: pointer;
`;


const loggedInLink = [{
  path: '/product',
  name: 'Product',
}, {
  path: '/order',
  name: 'Order',
},{
  path: '/setting_product',
  name: 'Setting Product',
}, {
  path: '/edit_Profile',
  name: 'Edit Profile',
}]

const Nav = () => {
  return (
    <NavWrapper>
      <LinkWrapper>
        <Link to="/">
          <Icon 
            src={iconSrc}
          />
        </Link>
        <SignupWrapper>
          <Link to="/register">
            <RegisterTag>
              Sign up
            </RegisterTag>
          </Link>
        </SignupWrapper>
      </LinkWrapper>
    </NavWrapper>
  )
}

const mapStateToProps = (state) => {
  return state.auth;
}

const mapDispatchToProps = (dispatch) => {
  const {
    logoutAuth,
  } = authAction;

  return{
    ...bindActionCreators({
      logoutAuth,
    }, dispatch),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWrapper(NavContainer),
  (BaseComponent) => (props) => {
    const { isAuth, logoutAuth } = props;

    if(isAuth){
      return(
        <LoggedInNav
          linkList={loggedInLink}
          logoutAuth={logoutAuth}
        />
      )
    }

    return(
      <BaseComponent 
        {...props}
      />
    )
  },
)(Nav);
