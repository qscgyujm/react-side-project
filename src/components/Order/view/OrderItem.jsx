import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';
import { format } from 'date-fns';

import { Button } from '../../../styles/unit';

const ItemContainer = styled.div`
  padding: 10px;
`;

const ItemWrapper = styled.div`
  display: flex;
  border: 1px solid #777777;
  padding: 5px;
`;

const ContentWrapper = styled.div`
`;

const DetailWrapper = styled.div`
  display: flex;
  :not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const DetailItem = styled.p`
`;

const OrderButton = styled(Button)`

`;

// order_id: 1
// totalPrice: 446
// detailOrder: Array(1)
// 0: {id: "3", quantity: "2", price: "446.00"}
// length: 1
// __proto__: Array(0)
// createdAt: "2020-03-05T07:51:50.000Z"

// const convertDateTime = (time) => format(time, 'yyyy/M/dd HH:mm:ss')
const convertDateTime = (time) => format(new Date(time), 'yy/MM/dd HH:mm:ss');

const OrderItem = (props) => {
  const { order } = props;
  const { 
    order_id,
    totalPrice,
    detailOrder,
    createdAt,
  } = order;

  console.log(format(new Date(createdAt), 'MM/dd HH:mm:ss'));

  return (
    <ItemContainer>
      <ItemWrapper>
        <ContentWrapper>
          Order 序號: {order_id}
        </ContentWrapper>
        <ContentWrapper>
          總價格: {totalPrice}
        </ContentWrapper>
        <ContentWrapper>
          訂單詳細資料:
          <br/>
          {
            detailOrder.map((detail, i) => (
              <DetailWrapper
                key={i}
              >
                <DetailItem>
                  產品: {detail.id}
                </DetailItem>
                <DetailItem>
                  數量: {detail.quantity}
                </DetailItem>
                <DetailItem>
                  價格: {detail.price}
                </DetailItem>
              </DetailWrapper>
            ))
          }
        </ContentWrapper>
        <ContentWrapper>
          建立時間: 
          {convertDateTime(createdAt)}
        </ContentWrapper>
        <ContentWrapper>
          <OrderButton>編輯</OrderButton>
          <OrderButton>出單</OrderButton>
        </ContentWrapper>
      </ItemWrapper>
    </ItemContainer>
  )
}

export default compose(
  (BaseComponent) => (props) => {
    const { order, updateSubmitOrder } = props;
    console.log('orderItem', order);
        
    const clickSubmitOrderHandler = () => {

    }

    const clickEditOrderHandler = () => {
      
    }

    return(
      <BaseComponent
        {...props}
        clickSubmitOrderHandler={clickSubmitOrderHandler}
        clickEditOrderHandler={clickEditOrderHandler}
      />
    )
  },
)(OrderItem);
