import React from 'react'
import styled from 'styled-components';

const ProfileWrapper = styled.div`
`;

const SectionWrapper = styled.section`
  margin-bottom: 15px;
`;

const SectionTitle = styled.p`
  margin-bottom: 10px;
`;

const SectionContent = styled.label`
`;

const SectionInput = styled.input`
  width: 100%;
`;

const Profile = (props) => {
  const { localProfile, setLocalProfile, isEdit } = props;
  const { email, name, location } = localProfile;

  const changeEmailHandler = (e) => {
    setLocalProfile({
      ...localProfile,
      email: e.target.value,
    })
  }

  const changeNameHandler = (e) => {
    setLocalProfile({
      ...localProfile,
      name: e.target.value,
    })
  }

  // const changePasswordHandler = (e) => {
  //   setLocalProfile({
  //     ...localProfile,
  //     password: e.target.value,
  //   })
  // }

  const changeLocationHandler = (e) => {
    setLocalProfile({
      ...localProfile,
      location: e.target.value,
    })
  }

  return (
    <ProfileWrapper>
      user
      <SectionWrapper>
        <SectionTitle>Email</SectionTitle>
        {
          isEdit
          ? (
            <SectionContent>
              {email}
            </SectionContent>
          )
          :(
            <SectionInput
              value={email}
              onChange={changeEmailHandler}
            />
          )
        }
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>Name</SectionTitle>
        <SectionInput 
          value={name}
          onChange={changeNameHandler}
        />
      </SectionWrapper>
      {/* <SectionWrapper>
        <SectionTitle>Password</SectionTitle>
        <SectionInput 
          value={password}
          onChange={changePasswordHandler}
        />
      </SectionWrapper> */}
      <SectionWrapper>
        <SectionTitle>Location</SectionTitle>
        <SectionInput 
          value={location}
          onChange={changeLocationHandler}
        />
      </SectionWrapper>
    </ProfileWrapper>
  )
}

export default Profile;
