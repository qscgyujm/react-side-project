import React from 'react'
import styled from 'styled-components';

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
  const { localOrder, productList } = props;

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
      <ConfirmButton>
        送出
      </ConfirmButton>
    </OrderWrapper>
  )
}

export default CheckoutPanel;
