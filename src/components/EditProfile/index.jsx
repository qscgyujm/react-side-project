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

import Profile from '../Profile/index'

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const index = (props) => {
  const { profile } = props;
  const [localProfile, setLocalProfile] = React.useState(profile);

  const clickCancelButtonHandler= () => {
    setLocalProfile(profile);
  }

  const clickSubmitButtonHandler= () => {
    
  }

  return (
    <>
      <Profile
        localProfile={localProfile}
        setLocalProfile={setLocalProfile}
        isEdit
      />
      <ButtonWrapper>
        <Button onClick={clickCancelButtonHandler}>取消</Button>
        <Button onClick={clickSubmitButtonHandler}>送出</Button>
      </ButtonWrapper>
    </>
  )
}

const mapStateToProps = (state) => {
  return state.profile;
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProfile,
  } = profileAction;

  return{
    ...bindActionCreators({
      fetchProfile,
    }, dispatch),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWrapper(EnhanceLoginContainer),
  withWrapper(EditWrapper),
  (BaseComponent) => (props) => {
    console.log('setting Profile', props);
    const { profile, fetchProfile } = props;

    React.useEffect(
      () => {
        if(isEmpty(profile)) {
          fetchProfile();
        }
      },
      [fetchProfile, profile],
    )

    if(isEmpty(profile)) {
      return(
        <div>Empty</div>
      )
    }

    return(
      <BaseComponent
        {...props}
      />
    )
  },
)(index);
