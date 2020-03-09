import React from 'react'
import styled, { css } from 'styled-components';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { every } from 'lodash';

import { action as authAction } from '../../redux/auth';

import withWrapper from '../../hoc/withWrapper';

import { LogoutContainer } from '../../styles/layout';
import { Button } from './style/unit';

const LoginWrapper = styled.div`
  width: 500px;
  min-height: 200px;
  border: 1px solid #316497;
  border-radius: 5px;
  padding: 15px;
  background-color: #e9e9e9;
`;

const LoginTitle = styled.p`
  font-size: 50px;
  text-align: center;
  margin-bottom: 20px;
`;

const LoginItemWrapper = styled.div`
  margin-bottom: 15px;
`;

const ItemTitle = styled.p`
  margin-bottom: 10px;
  margin-right: 10px;
`;

const ItemInput = styled.input`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const LoginButton = styled(Button)`
  padding: 5px;

  ${props => props.isCancel && css`
    color: #f34f66;
    transition: 0.5s;

    :hover {
      background-color: #f34f66;
      color: #FFF;
      transition: 0.5s;
    }
  `}
`;

const Home = (props) => {
  const { 
    localState,
    changeEmailHandler,
    changePasswordHandler,
    clickCancelHandler,
    clickConfirmHandler,
  } = props;

  return (
    <>
      <LoginTitle>
        Login
      </LoginTitle>
      <LoginItemWrapper>
        <ItemTitle>
          Email:
        </ItemTitle>
        <ItemInput 
          value={localState.email}
          onChange={changeEmailHandler}
        />
      </LoginItemWrapper>
      <LoginItemWrapper>
        <ItemTitle>
          Password:
        </ItemTitle>
        <ItemInput
          type='password'
          value={localState.password}
          onChange={changePasswordHandler}
        />
      </LoginItemWrapper>
      <ButtonWrapper>
        <LoginButton
          isCancel
          onClick={clickCancelHandler}
        >
          Cancel
        </LoginButton>
        <LoginButton
          onClick={clickConfirmHandler}
        >
          Login
        </LoginButton>
      </ButtonWrapper>
    </>
  )
}

const mapStateToProps = (state) => {
  return state.auth;
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchAuth,
    loginAuth,
  } = authAction;

  return{
    ...bindActionCreators({
      fetchAuth,
      loginAuth,
    }, dispatch),
  }
}



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWrapper(LogoutContainer),
  withWrapper(LoginWrapper),
  (BaseComponent) => (props) => {

    const [localState, setLocalState] = React.useState({
      email: '',
      password: '',
    })

    const changeEmailHandler = (e) => {
      setLocalState({
        ...localState,
        email: e.target.value,
      })
    }

    const changePasswordHandler = (e) => {
      setLocalState({
        ...localState,
        password: e.target.value,
      })
    }

    const clickCancelHandler = () => {
      setLocalState({
        email: '',
        password: '',
      })
    }

    const clickConfirmHandler = () => {
      
      const { loginAuth } = props;

      if(!every(localState)) {
        return;
      }

      loginAuth(localState);
    }


    return(
      <BaseComponent 
        {...props}
        localState={localState}
        changeEmailHandler={changeEmailHandler}
        changePasswordHandler={changePasswordHandler}
        clickCancelHandler={clickCancelHandler}
        clickConfirmHandler={clickConfirmHandler}
      />
    )
  },
)(Home);
