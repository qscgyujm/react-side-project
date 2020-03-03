import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { action as productAction } from '../../redux/product';

import withWrapper from '../../hoc/withWrapper';

import { LoginContainer } from '../../styles/layout'

import Loading from '../Loading';
import SellProductItem from './view/SellProductItem';
import OrderPanel from './view/CheckProduct';

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SellProductTable = (props) => {
  const { productList } = props;;

  const [localOrder, setLocalOrder] = React.useState([]);

  return (
    <>
      <OrderPanel 
        localOrder={localOrder}
        productList={productList}
      />
      <ProductWrapper>
        {
          productList.map((product, i) => {
            return(
              <SellProductItem
                key={i}
                {...props}
                product={product}
                localOrder={localOrder}
                setLocalOrder={setLocalOrder}
              />
            )
          })             
        }
      </ProductWrapper>
    </>
  )
}

const mapStateToProps = (state) => {
  return state.product;
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProduct,
  } = productAction;

  return{
    ...bindActionCreators({
      fetchProduct,
    }, dispatch),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWrapper(LoginContainer),
  (BaseComponent) => (props) => {
    const { productList, fetchProduct } = props;

    React.useEffect(
      () => {
        if(isEmpty(productList)) {
          fetchProduct();
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    if(isEmpty(productList)) {
      return(
        <Loading />
      )
    }

    return(
      <BaseComponent 
        {...props}
      />
    )
  },
)(SellProductTable);

