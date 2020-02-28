import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';
import { pick, every } from 'lodash';

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
    const [isEdit, setIsEdit] =React.useState(false);

    const clickCancelButtonHandler = () => {
      setIsEdit(false);
    }

    const clickEditButtonHandler = () => {
      setIsEdit(true);
    }

    const clickUpdatedButtonHandler = () => {
      const { localState, updateProduct } = props;
      console.log(localState);

      const updatedProduct = pick(localState, ['name', 'price']);

      if(
        every(updatedProduct)
        && updatedProduct.price < 1
      ) {
        return;
      }

      const updatedId = localState.p_id;
      const updatedBody = pick(localState, ['name', 'description', 'price', 'imageUrl']);

      const resolve = () => setIsEdit(false);
    
      updateProduct(updatedId, updatedBody, resolve);
    }

    if(isEdit) {
      return (
        <>
          <EditPanel
            {...props}
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
