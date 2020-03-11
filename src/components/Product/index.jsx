import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { action as productAction } from '../../redux/product';
import { action as orderAction } from '../../redux/order';

import withWrapper from '../../hoc/withWrapper';

import { LoginContainer } from '../../styles/layout'

import Loading from '../Loading';
import SellProductItem from './view/SellProductItem';
import CheckoutProduct from './view/CheckoutProduct';

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SellProductTable = (props) => {
  const { productList, createOrder } = props;;

  const [localOrder, setLocalOrder] = React.useState([]);

  return (
    <>
      <CheckoutProduct 
        localOrder={localOrder}
        setLocalOrder={setLocalOrder}
        productList={productList}
        createOrder={createOrder}
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
  const {
    createOrder,
  } = orderAction;

  return{
    ...bindActionCreators({
      fetchProduct,
      createOrder,
    }, dispatch),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWrapper(LoginContainer),
  (BaseComponent) => (props) => {
    const { isFetch, productList, fetchProduct } = props;

    React.useEffect(
      () => {
        fetchProduct();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    if(isFetch) {
      return(
        <Loading 
          isLoading
        />
      )
    }

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

