import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import { action as orderAction } from '../../redux/order';

import OrderItem from './view/OrderItem';

const index = (props) => {
  const { orderList, updateSubmitOrder } = props;
  return (
    <div>
      {
        orderList.map((order, i) => (
          <OrderItem
            key={i}
            order={order}
            updateSubmitOrder={updateSubmitOrder}
          />
        ))
      }
    </div>
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
  (BaseComponent) => (props) => {
    const { orderList, fetchOrder } = props;
    console.log(props);

    React.useEffect(
      () => {
        if(isEmpty(orderList)) {
          fetchOrder();
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    return(
      <BaseComponent 
        {...props}
      />
    )
  },
)(index)
