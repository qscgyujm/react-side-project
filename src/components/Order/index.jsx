/* eslint react-hooks/rules-of-hooks: "off" */
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
  const { orderList, updateSubmitOrder, deleteOrder, clickMoveToProductHandler } = props;

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
              deleteOrder={deleteOrder}
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
    deleteOrder,
    updateSubmitOrder,
  } = orderAction;

  return{
    ...bindActionCreators({
      fetchOrder,
      updateOrder,
      deleteOrder,
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
        fetchOrder();
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
