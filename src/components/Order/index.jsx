import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import { action as orderAction } from '../../redux/order';

const index = (props) => {
  return (
    <div>
      OrderList
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
  } = orderAction;

  return{
    ...bindActionCreators({
      fetchOrder,
      updateOrder,
    }, dispatch),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(index)
