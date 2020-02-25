import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';

import AddIconSrc from '../../../img/add.png';

import { ProductWrapper } from '../../Product/style/layout';
import { Button } from '../../Product/style/unit';

import ProductImage from '../../Product/view/ProductImg';
import EditPanel from './EditPanel';

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const AddIcon = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CreatePanel = (props) => {
  const { localState, setLocalState, } = props;
  return (
    <>
      <ProductImage
        imageUrl={localState.imageUrl}
      />
      <EditPanel 
        localState={localState}
        setLocalState={setLocalState}
      />
    </>
  )
}

export default compose(
  (BaseComponent) => (props) => {
    const [localState, setLocalState] = React.useState({
      name: '',
      description: '',
      price: 1,
      imageUrl: '',
    })
    
    const [isCreate, setIsCreate] =React.useState(false);

    const clickCreateButtonHandler = () => {
      setIsCreate(true);

      setLocalState({
        name: '',
        description: '',
        price: 1,
        imageUrl: '',
      });
    }

    const clickCancelButtonHandler = () => {
      setIsCreate(false);
    }

    const clickSaveButtonHandler = () => {
      console.log(localState);
    }

    if(!isCreate){
      return (
        <ProductWrapper>
          <IconWrapper>
            <AddIcon
              src={AddIconSrc}
              onClick={clickCreateButtonHandler}
              alt='add'
            />
          </IconWrapper>
        </ProductWrapper>
      )
    }

    return(
      <ProductWrapper>
        <BaseComponent 
          {...props}
          localState={localState}
          setLocalState={setLocalState}
          clickSaveButtonHandler={clickSaveButtonHandler}
        />
        <ButtonWrapper>
          <Button onClick={clickCancelButtonHandler} >取消</Button>
          <Button onClick={clickSaveButtonHandler}>儲存</Button>
        </ButtonWrapper>
      </ProductWrapper>
    )
  },
)(CreatePanel);
