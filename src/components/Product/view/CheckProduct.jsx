import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';

import { Button } from '../style/unit';

const OrderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PriceWrapper = styled.div`
  margin-right: 30px;
`;

const PriceTag = styled.span`
  font-size: 30px;
  color: #e1334d;
`;

const ConfirmButton = styled(Button)`
`;

const CheckoutPanel = (props) => {
  const { 
    localOrder, 
    productList, 
    clickSubmitOrderHandler, 
    clickCancelOrderHandler,
  } = props;

  const totalPrice = React.useMemo(() => {
    return localOrder.reduce((acc, order) => {
      const price = productList.find(product => product.p_id === order.id).price;
      return acc + price * order.count;
    }, 0);
  }, [localOrder, productList])

  return (
    <OrderWrapper>
      <PriceWrapper>
        Total:
        <PriceTag>
          {totalPrice}
        </PriceTag>
      </PriceWrapper>
      <ConfirmButton
        onClick={clickSubmitOrderHandler}
      >
        送出
      </ConfirmButton>
      <ConfirmButton
        onClick={clickCancelOrderHandler}
      >
        取消
      </ConfirmButton>
    </OrderWrapper>
  )
}

export default compose(
  (BaseComponent) => (props) => {
    const { localOrder, setLocalOrder, createOrder } = props;
    
    const clickSubmitOrderHandler = () => {
      console.log('localOrder', localOrder);

      createOrder(localOrder);
    }

    const clickCancelOrderHandler = () => {
      setLocalOrder([]);
    }
    
    return(
      <BaseComponent 
        {...props}
        clickSubmitOrderHandler={clickSubmitOrderHandler}
        clickCancelOrderHandler={clickCancelOrderHandler}
      />
    )
  },
)(CheckoutPanel);
