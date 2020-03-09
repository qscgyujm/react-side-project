import React from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';

import withWrapper from '../../../hoc/withWrapper'
import withDeleteProduct from '../hoc/withDeleteProduct';

import ProductImage from '../../Product/view/ProductImg';
import SettingPanel from './SettingPanel';

const ProductContainer = styled.div`
  width: 25%;
  padding: 10px;
  box-sizing: border-box;
`;

const ProductWrapper = styled.div`
  background-color: #8a8a8a;
  border: solid 1px #8a8a8a;
  border-radius: 5px;
  min-height: 450px;
`;

const Product = (props) => {
  console.log('product', props.product);
  const { product } = props;

  const [localState, setLocalState] = React.useState(product);

  return (
    <>
      <ProductImage
        imageUrl={localState.imageUrl}
      />
      <SettingPanel
        {...props}
        localState={localState}
        setLocalState={setLocalState}
      />
    </>
  )
}

export default compose(
  withWrapper(ProductContainer),
  withWrapper(ProductWrapper),
  withDeleteProduct,
)(Product);
