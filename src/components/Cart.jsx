"use client"

import { useState } from "react"

const Cart = ({ items, total, onUpdateQuantity, onRemoveItem, onClose, onCreateOrder }) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
    orderType: "takeaway", // Добавить это поле
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " сум"
  }

  const handleCheckout = () => {
    setShowCheckoutForm(true)
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()
    const isValid =
      customerInfo.name && customerInfo.phone && (customerInfo.orderType === "dine-in" || customerInfo.address)

    if (isValid) {
      onCreateOrder(items, total, customerInfo)
      setShowCheckoutForm(false)
      setCustomerInfo({ name: "", phone: "", address: "", comment: "", orderType: "takeaway" })
      onClose()
    }
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>{showCheckoutForm ? "Оформление заказа" : "Корзина"}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cart-content">
          {!showCheckoutForm ? (
            // Обычное содержимое корзины
            <>
              {items.length === 0 ? (
                <div className="empty-cart">
                  <p>Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {items.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <div className="cart-item-price">{formatPrice(item.price)}</div>
                        </div>
                        <div className="cart-item-controls">
                          <button
                            className="cart-quantity-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="cart-quantity">{item.quantity}</span>
                          <button
                            className="cart-quantity-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="cart-item-total">{formatPrice(item.price * item.quantity)}</div>
                        <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <strong>Итого: {formatPrice(total)}</strong>
                    </div>
                    <button className="checkout-btn" onClick={handleCheckout}>
                      Оформить заказ
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            // Форма оформления заказа
            <form onSubmit={handleOrderSubmit} className="checkout-form">
              <div className="order-summary">
                <h3>Ваш заказ:</h3>
                <div className="summary-items">
                  {items.map((item) => (
                    <div key={item.id} className="summary-item">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-total">
                  <strong>Итого: {formatPrice(total)}</strong>
                </div>
              </div>

              <div className="customer-form">
                <div className="order-type-section">
                  <h3>Тип заказа:</h3>
                  <div className="order-type-options">
                    <label className="order-type-option">
                      <input
                        type="radio"
                        name="orderType"
                        value="takeaway"
                        checked={customerInfo.orderType === "takeaway"}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, orderType: e.target.value })}
                      />
                      <div className="option-content">
                        <span className="option-icon">🥡</span>
                        <span className="option-text">С собой</span>
                      </div>
                    </label>

                    <label className="order-type-option">
                      <input
                        type="radio"
                        name="orderType"
                        value="dine-in"
                        checked={customerInfo.orderType === "dine-in"}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, orderType: e.target.value })}
                      />
                      <div className="option-content">
                        <span className="option-icon">🍽️</span>
                        <span className="option-text">Здесь</span>
                      </div>
                    </label>
                  </div>
                </div>
                <h3>{customerInfo.orderType === "takeaway" ? "Информация для доставки:" : "Информация о заказе:"}</h3>

                <div className="form-group">
                  <label>Ваше имя *</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Номер телефона *</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                    required
                  />
                </div>

                {customerInfo.orderType === "takeaway" && (
                  <div className="form-group">
                    <label>Адрес доставки *</label>
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      placeholder="Укажите полный адрес доставки"
                      rows="3"
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Комментарий к заказу</label>
                  <textarea
                    value={customerInfo.comment}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, comment: e.target.value })}
                    placeholder="Дополнительные пожелания (необязательно)"
                    rows="2"
                  />
                </div>
              </div>

              <div className="checkout-actions">
                <button type="button" className="back-btn" onClick={() => setShowCheckoutForm(false)}>
                  Назад к корзине
                </button>
                <button type="submit" className="confirm-order-btn">
                  Подтвердить заказ
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
