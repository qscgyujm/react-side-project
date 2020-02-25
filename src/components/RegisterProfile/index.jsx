/* eslint react-hooks/rules-of-hooks: "off" */
import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

import { action as profileAction } from '../../redux/profile';

import withWrapper from '../../hoc/withWrapper';

import { LogoutContainer } from '../../styles/layout';
import { Button } from '../../styles/unit';
import Profile from '../Profile';

const RegisterWrapper = styled.div`
  background-color: #e9e9e9;
  width: 500px;
  min-height: 300px;
  padding: 15px;
`;

const RegisterTitle = styled.p`
  text-align: center;
  font-size: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const index = (props) => {
  const { createProfile } = props;
  const history = useHistory();

  const [localProfile, setLocalProfile] = React.useState({
    email: '',
    name: '',
    password: '',
    location: '',
  });

  const clickCancelButtonHandler = () => {
    setLocalProfile({
      email: '',
      name: '',
      password: '',
      location: '',
    });
  }

  const clickRegisterButtonHandler = () => {

    const resolve = () => {
      history.push('/');
    }

    const reject = () => {
      setLocalProfile({
        email: '',
        name: '',
        password: '',
        location: '',
      });
    }

    createProfile( localProfile, resolve, reject );
  }

  return (
    <>
      <RegisterTitle>
        Register
      </RegisterTitle>
      <Profile 
        localProfile={localProfile}
        setLocalProfile={setLocalProfile}
      />
      <ButtonWrapper>
        <Button onClick={clickCancelButtonHandler}>Cancel</Button>
        <Button onClick={clickRegisterButtonHandler}>register</Button>
      </ButtonWrapper>
    </>
  )
}

const mapStateToProps = (state) => {
  return state.auth;
}

const mapDispatchToProps = (dispatch) => {
  const {
    createProfile,
  } = profileAction;

  return{
    ...bindActionCreators({
      createProfile,
    }, dispatch),
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWrapper(LogoutContainer),
  withWrapper(RegisterWrapper),
)(index);
