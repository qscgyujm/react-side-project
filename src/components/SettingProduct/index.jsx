import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { action as productAction } from '../../redux/product';

import withWrapper from '../../hoc/withWrapper';

import { LoginContainer } from '../../styles/layout'

import SettingProductItem from './view/ProductItem';
import CreateProduct from './view/CreateProduct';

const ProductWrapper = styled.div`
  display: flex;
`;

const SettingProduct = (props) => {
  const { product: products } = props;;

  return (
    <>
      {
        products.map((product, i) => {
          return(
            <SettingProductItem
              key={i}
              {...props}
              product={product}
            />
          )
        })
      }
      <CreateProduct />
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
  withWrapper(ProductWrapper),
  (BaseComponent) => (props) => {
    const { product, fetchProduct } = props

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
        <div>Empty</div>
      )
    }

    return(
      <BaseComponent 
        {...props}
      />
    )
  },
)(SettingProduct);

