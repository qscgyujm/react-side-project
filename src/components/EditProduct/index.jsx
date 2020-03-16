import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { action as productAction } from '../../redux/product';
import { action as fileAction } from '../../redux/file';

import withWrapper from '../../hoc/withWrapper';

import { LoginContainer } from '../../styles/layout'

import Loading from '../Loading';
import SettingProductItem from './view/ProductItem';
import AddProduct from './view/AddProduct';

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


const SettingProduct = (props) => {
  const { productList } = props

  return (
    <>
      {
        productList.map((product, i) => {
          return(
            <SettingProductItem
              key={i}
              {...props}
              product={product}
            />
          )
        })
      }
      <AddProduct 
        {...props}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return state.product;
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProduct,
    createAddProduct,
    deleteProduct,
  } = productAction;

  const { 
    uploadImg,
  } = fileAction;

  return{
    ...bindActionCreators({
      fetchProduct,
      createAddProduct,
      deleteProduct,
      uploadImg,
    }, dispatch),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWrapper(LoginContainer),
  withWrapper(ProductWrapper),
  (BaseComponent) => (props) => {
    const { isFetching, fetchProduct } = props

    React.useEffect(
      () => {
        fetchProduct();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    if(isFetching){
      return(
        <Loading 
          isLoading
        />
      )
    }

    return(
      <BaseComponent 
        {...props}
      />
    )
  },
)(SettingProduct);

