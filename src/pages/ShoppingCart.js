import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'

export default function ShoppingCart({ items, cartItems, setCartItem }) {
  const [checkedItems, setCheckedItems] = useState(cartItems.map((el) => el.itemId));
  // const [total, setTotal] = useState({});

  // useEffect(() => {
  //   setTotal(getTotal());
  //   console.log(cartItems);
  // }, [cartItems]);

  const handleCheckChange = (checked, id) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    }else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(cartItems.map((el) => el.itemId))
    }else {
      setCheckedItems([]);
    }
  };

  const handleQuantityChange = (quantity, itemId) => {
    // quantity: e.target.value, itemId: item.id
    // cartItems => item.id의 quantity 변경
    let targetItemIdx;
    cartItems.forEach((v, i) => v.itemId === itemId ? targetItemIdx = i : null);
    setCartItem(cartItems.map((v, i) => i === targetItemIdx 
    ? {itemId: v.itemId, quantity: quantity} 
    : v));
  };


  const handleDelete = (itemId) => {
    setCheckedItems(checkedItems.filter((el) => el !== itemId));
    setCartItem(cartItems.filter(v => v.itemId !== itemId));
  };

  const getTotal = () => {
    let cartIdArr = cartItems.map((el) => el.itemId);
    let total = {
      price: 0,
      quantity: 0,
    };


    for (let i = 0; i < cartIdArr.length; i++) {
      if (checkedItems.indexOf(cartIdArr[i]) > -1) {
        // checkedItems에 cardIdArr 요소가 있는지 판별
        let quantity = cartItems[i].quantity;
        let price = items.filter((el) => el.id === cartItems[i].itemId)[0].price;
        // checkedItems의 가격 배열

        total.quantity = total.quantity + quantity;
        total.price = total.price + quantity * price;
      }
    }
    return total;
  };

  const renderItems = items.filter((el) => cartItems.map((el) => el.itemId).indexOf(el.id) > -1);
  const total = getTotal();

  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">장바구니</div>
        <span id="shopping-cart-select-all">
          <input
            type="checkbox"
            checked={
              checkedItems.length === cartItems.length ? true : false
            }
            onChange={(e) => handleAllCheck(e.target.checked)} >
          </input>
          <label >전체선택</label>
        </span>
        <div id="shopping-cart-container">
          {!cartItems.length ? (
            <div id="item-list-text">
              장바구니에 아이템이 없습니다.
            </div>
          ) : (
              <div id="cart-item-list">
                {renderItems.map((item, idx) => {
                  const quantity = cartItems.filter(el => el.itemId === item.id)[0].quantity
                  return <CartItem
                    key={idx}
                    handleCheckChange={handleCheckChange}
                    handleQuantityChange={handleQuantityChange}
                    handleDelete={handleDelete}
                    item={item}
                    checkedItems={checkedItems}
                    quantity={quantity}
                  />
                })}
              </div>
            )}
          <OrderSummary total={total.price} totalQty={total.quantity} />
        </div>
      </div >
    </div>
  )
}
