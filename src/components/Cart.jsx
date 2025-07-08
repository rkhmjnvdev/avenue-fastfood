
"use client"

const Cart = ({ items, total, onUpdateQuantity, onRemoveItem, onClose }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " сум"
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Корзина</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cart-content">
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
                <button className="checkout-btn">Оформить заказ</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
