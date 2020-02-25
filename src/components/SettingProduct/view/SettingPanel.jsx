import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';

import { SectionWrapper } from '../style/layout';
import { Button } from '../style/unit';

import EditPanel from './EditPanel';

const ProductTitle = styled.p`
`;

const ProductDescribe = styled.p`
`;

const ProductPrice = styled.p`
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const EditButton = styled(Button)`
`;

const ProductPanel = (props) => {
  const { localState, clickEditButtonHandler } = props;
  const { name, description, price } = localState;

  return (
    <div>
      <SectionWrapper>
        <ProductTitle>{name}</ProductTitle>
      </SectionWrapper>
      <SectionWrapper>
        <ProductDescribe>{description}</ProductDescribe>
      </SectionWrapper>
      <SectionWrapper>
        <ProductPrice>{price}</ProductPrice>
      </SectionWrapper>
      <SectionWrapper
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
        >
        <EditButton
          onClick={clickEditButtonHandler}
        >
          編輯
        </EditButton>
      </SectionWrapper>
    </div>
  )
}

export default compose(
  (BaseComponent) => (props) => {
    const { localState } = props;
    const [isEdit, setIsEdit] =React.useState(false);

    const clickCancelButtonHandler = () => {
      setIsEdit(false);
    }

    const clickEditButtonHandler = () => {
      setIsEdit(true);
    }

    const clickUpdatedButtonHandler = () => {
      console.log(localState)
    }

    if(isEdit) {
      return (
        <>
          <EditPanel
            {...props}
            clickCancelButtonHandler={clickCancelButtonHandler}
          />
          <ButtonWrapper>
            <EditButton onClick={clickCancelButtonHandler}>取消</EditButton>
            <EditButton onClick={clickUpdatedButtonHandler}>更新</EditButton>
          </ButtonWrapper>
        </>
      )
    }

    return(
      <BaseComponent 
        {...props}
        clickEditButtonHandler={clickEditButtonHandler}
      />
    )
  },
)(ProductPanel);
