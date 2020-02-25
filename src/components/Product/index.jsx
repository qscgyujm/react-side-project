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
`;

const SellProductTable = (props) => {
  const { product: products } = props;;

  const [localOrder, setLocalOrder] = React.useState([]);

  return (
    <>
      <OrderPanel 
        localOrder={localOrder}
        products={products}
      />
      <ProductWrapper>
        {
          products.map((product, i) => {
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
    const { product, fetchProduct } = props;

    React.useEffect(
      () => {
        if(isEmpty(product)) {
          fetchProduct();
        }
      },
      [fetchProduct, product],
    )

    if(isEmpty(product)) {
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

