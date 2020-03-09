/* eslint react-hooks/rules-of-hooks: "off" */
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import { action as profileAction } from '../../redux/profile';

import withWrapper from '../../hoc/withWrapper';

import { LoginContainer } from '../../styles/layout'
import { Button } from '../../styles/unit';
import { Header } from './style/unit';
import { Wrapper as LoadingWrapper } from '../Loading';
import Profile from '../Profile/index'
import Password from './view/Password';

const EnhanceLoginContainer = styled(LoginContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 50px;
`;

const EditWrapper = styled.div`
  width: 500px;
  min-height: 300px;
  padding: 15px;
  border: 1px solid #316497;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const index = (props) => {
  const { 
    profile,
    isEdit,
    setIsEdit,
    updateProfile,
    clickEditProfileButtonHandler,
    clickChangePasswordButtonHandler,
  } = props;
  const [localProfile, setLocalProfile] = React.useState(profile);

  const clickCancelButtonHandler= () => {
    setLocalProfile(profile);
    setIsEdit(false);
  }

  const clickSubmitButtonHandler= () => {
    
    const resolve = () => setIsEdit(false);

    updateProfile(localProfile, resolve);
  }

  return (
    <>
      <Header>
        Edit Profile
      </Header>
      <Profile
        localProfile={localProfile}
        setLocalProfile={setLocalProfile}
        isEdit={isEdit}
        isInEdit
      />
      {
        isEdit
        ? (
          <ButtonWrapper>
            <Button onClick={clickCancelButtonHandler}>取消</Button>
            <Button onClick={clickSubmitButtonHandler}>送出</Button>
          </ButtonWrapper>
        )
        :(
          <ButtonWrapper>
            <Button onClick={clickEditProfileButtonHandler}>編輯個人資料</Button>
            <Button onClick={clickChangePasswordButtonHandler}>修改密碼</Button>
          </ButtonWrapper>
        )
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return state.profile;
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProfile,
    updateProfile,
    updatePassword,
  } = profileAction;

  return{
    ...bindActionCreators({
      fetchProfile,
      updateProfile,
      updatePassword,
    }, dispatch),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWrapper(EnhanceLoginContainer),
  withWrapper(EditWrapper),
  (BaseComponent) => (props) => {
    const { profile, fetchProfile, updatePassword } = props;

    const [isEdit, setIsEdit] = React.useState(false);
    const [isPassword, setIsPassword] = React.useState(false);

    React.useEffect(
      () => {
        if(isEmpty(profile)) {
          fetchProfile();
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    const clickEditProfileButtonHandler = () => {
      setIsEdit(true);
    }

    const clickChangePasswordButtonHandler = () => {
      setIsPassword(true);
    }

    const clickCancelPasswordButtonHandler = () => {
      isPassword(false);
    }

    if(isEmpty(profile)) {
      return(
        <LoadingContainer>
          <LoadingWrapper>
            Empty
          </LoadingWrapper>
        </LoadingContainer>
      )
    }

    if(isPassword) {
      return (
        <Password
          setIsPassword={setIsPassword}
          updatePassword={updatePassword}
        />
      )
    }

    return(
      <BaseComponent
        {...props}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        clickEditProfileButtonHandler={clickEditProfileButtonHandler}
        clickChangePasswordButtonHandler={clickChangePasswordButtonHandler}
        clickCancelPasswordButtonHandler={clickCancelPasswordButtonHandler}
      />
    )
  },
)(index);
