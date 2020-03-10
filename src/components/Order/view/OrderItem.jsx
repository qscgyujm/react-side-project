import React from 'react'
import styled from 'styled-components';
import { compose } from 'recompose';
import { format } from 'date-fns';

import { Button } from '../../../styles/unit';

const ItemContainer = styled.div`
  margin-bottom: 5px;
`;

const ItemWrapper = styled.div`
  display: flex;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  background-color: #e9e9e9;
  
  padding: 5px;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const InfoWrapper = styled.div`
  :not(:last-of-type) {
    margin-right: 30px;
  }
`;

const EditWrapper = styled.div`
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
  :not(:last-of-type) {
    margin-right: 15px;
  }
`;

const convertDateTime = (time) => format(new Date(time), 'yy/MM/dd HH:mm:ss');

const OrderItem = (props) => {
  const { order, clickSubmitOrderHandler, clickDeleteOrderHandler } = props;
  const { 
    order_id,
    totalPrice,
    detailOrder,
    createdAt,
  } = order;

  return (
    <ItemContainer>
      <ItemWrapper>
        <ContentWrapper>
          <InfoWrapper>
            Order 序號: {order_id}
          </InfoWrapper>
          <InfoWrapper>
            總價格: {totalPrice}
          </InfoWrapper>
          <InfoWrapper>
            建立時間: 
            {convertDateTime(createdAt)}
          </InfoWrapper>
        </ContentWrapper>
        {/* <ContentWrapper>
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
        </ContentWrapper> */}
        {/* <ContentWrapper>
          建立時間: 
          {convertDateTime(createdAt)}
        </ContentWrapper> */}
        <EditWrapper>
          <OrderButton
            onClick={clickDeleteOrderHandler}
          >
            刪除
          </OrderButton>
          <OrderButton>編輯</OrderButton>
          <OrderButton
            onClick={clickSubmitOrderHandler}
          >
            出單
          </OrderButton>
        </EditWrapper>
      </ItemWrapper>
    </ItemContainer>
  )
}

export default compose(
  (BaseComponent) => (props) => {
    console.log('props', props);
    const { order, deleteOrder, updateSubmitOrder } = props;
        
    const clickSubmitOrderHandler = () => {
      const { order_id : orderId } = order;

      updateSubmitOrder(orderId);
    }

    const clickEditOrderHandler = () => {
    }

    const clickDeleteOrderHandler = () => {
      const { order_id : orderId } = order;
      deleteOrder(orderId);
    }

    return(
      <BaseComponent
        {...props}
        clickSubmitOrderHandler={clickSubmitOrderHandler}
        clickEditOrderHandler={clickEditOrderHandler}
        clickDeleteOrderHandler={clickDeleteOrderHandler}
      />
    )
  },
)(OrderItem);
