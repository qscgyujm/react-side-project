/* eslint react-hooks/rules-of-hooks: "off" */
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';

import { action as adminAction } from '../../redux/admin';
import { action as fileAction } from '../../redux/file';

import withWrapper from '../../hoc/withWrapper';

import ProductItem from '../EditProduct/view/ProductItem';
import CreateProduct from './view/CreateProduct';
import Loading from '../Loading';
import { LoginContainer } from '../../styles/layout'

const EnhanceLoginContainer = styled(LoginContainer)`
  background-color: #4cd6a5;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const index = (props) => {
  console.log('create', props);
  const { productList } = props;

  return (
    <>
      {
        productList.map((product,i) => {
          return (
            <ProductItem 
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
  const { isAdmin } = state.auth;
  return {
    ...state.admin,
    isAdmin,
  };
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  } = adminAction;

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
  withWrapper(EnhanceLoginContainer),
  withWrapper(ProductWrapper),
  (BaseComponent) => (props) => {
    const { isFetching, isAdmin, productList, fetchProduct } = props

    const history = useHistory();

    React.useEffect(
      () => {
        fetchProduct();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    if(isFetching) {
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

    if(!isAdmin) {
      history.push('/product')
    }

    return(
      <BaseComponent 
        {...props}
      />
    )
  },
)(index)


