import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';

import { action as orderAction } from '../../redux/order';

import withWrapper from '../../hoc/withWrapper';

import Loading from '../Loading';
import OrderItem from './view/OrderItem';
import { LoginContainer } from '../../styles/layout'
import { Button } from '../../styles/unit';

const ItemWrapper = styled.div`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  padding: 10px;
`;

const MoveButton = styled(Button)`
`;

const index = (props) => {
  const { orderList, updateSubmitOrder, clickMoveToProductHandler } = props;
  return (
    <>
      <ButtonWrapper>
        <MoveButton
          onClick={clickMoveToProductHandler}
        >
          To Product
        </MoveButton>
      </ButtonWrapper>
      <ItemWrapper>
        {
          orderList.map((order, i) => (
            <OrderItem
              key={i}
              order={order}
              updateSubmitOrder={updateSubmitOrder}
            />
          ))
        }
      </ItemWrapper>
    </>
  )
}

const mapStateToProps = (state) => {
  return state.order;
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchOrder,
    updateOrder,
    updateSubmitOrder,
  } = orderAction;

  return{
    ...bindActionCreators({
      fetchOrder,
      updateOrder,
      updateSubmitOrder,
    }, dispatch),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWrapper(LoginContainer),
  (BaseComponent) => (props) => {
    const { orderList, fetchOrder } = props;
    const history = useHistory();

    React.useEffect(
      () => {
        if(isEmpty(orderList)) {
          fetchOrder();
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    const clickMoveToProductHandler = () => {
      history.push('/product');
    }

    if(isEmpty(orderList)) {
      return(
        <Loading />
      )
    }

    return(
      <BaseComponent 
        {...props}
        clickMoveToProductHandler={clickMoveToProductHandler}
      />
    )
  },
)(index)
