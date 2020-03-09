import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { action as productAction } from '../../redux/product';
import { action as fileAction } from '../../redux/file';

import withWrapper from '../../hoc/withWrapper';

import { LoginContainer } from '../../styles/layout'

import Loading from '../Loading';
import SettingProductItem from './view/ProductItem';
import CreateProduct from './view/CreateProduct';

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


const SettingProduct = (props) => {
  // const { productList } = props;
  console.log('SettingProduct', props.productList);

  const productList = React.useMemo(
    () => props.productList,
    [props.productList],
  )

  console.log(productList);

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
      <CreateProduct 
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
    createProduct,
    updateProduct,
    deleteProduct,
  } = productAction;

  const { 
    uploadImg,
  } = fileAction;

  return{
    ...bindActionCreators({
      fetchProduct,
      createProduct,
      updateProduct,
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
    const { productList, fetchProduct } = props
    console.log('SettingProduct', productList);

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
)(SettingProduct);

