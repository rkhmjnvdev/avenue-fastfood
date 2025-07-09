"use client"

const Orders = ({ orders, onClose }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " сум"
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status) => {
    const colors = {
      Новый: "#4ecdc4",
      "В обработке": "#f39c12",
      Готовится: "#e67e22",
      Готов: "#27ae60",
      Доставлен: "#95a5a6",
      Отменен: "#e74c3c",
    }
    return colors[status] || "#6c757d"
  }

  return (
    <div className="orders-overlay" onClick={onClose}>
      <div className="orders-modal" onClick={(e) => e.stopPropagation()}>
        <div className="orders-header">
          <h2>История заказов</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="orders-content">
          {orders.length === 0 ? (
            <div className="empty-orders">
              <div className="empty-orders-icon">📋</div>
              <p>У вас пока нет заказов</p>
              <small>Добавьте товары в корзину и оформите первый заказ!</small>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3 className="order-number">Заказ #{order.id}</h3>
                      <p className="order-date">{formatDate(order.date)}</p>
                    </div>
                    <div className="order-status-section">
                      <span className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                        {order.status}
                      </span>
                      <div className="order-total">{formatPrice(order.total)}</div>
                    </div>
                    <div className="order-type-info">
                      <span className="order-type-badge" data-type={order.customerInfo?.orderType}>
                        {order.customerInfo?.orderType === "takeaway" ? "🥡 С собой" : "🍽️ Здесь"}
                      </span>
                    </div>
                  </div>

                  <div className="order-items">
                    <h4>Состав заказа:</h4>
                    <div className="order-items-list">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <img src={item.image || "/placeholder.svg"} alt={item.name} className="order-item-image" />
                          <div className="order-item-info">
                            <span className="order-item-name">{item.name}</span>
                            <span className="order-item-details">
                              {item.quantity} шт × {formatPrice(item.price)}
                            </span>
                          </div>
                          <div className="order-item-total">{formatPrice(item.price * item.quantity)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.customerInfo && (
                    <div className="order-customer-info">
                      <h4>Информация о доставке:</h4>
                      <div className="customer-details">
                        <p>
                          <strong>Имя:</strong> {order.customerInfo.name}
                        </p>
                        <p>
                          <strong>Телефон:</strong> {order.customerInfo.phone}
                        </p>
                        {order.customerInfo.orderType === "takeaway" && order.customerInfo.address && (
                          <p>
                            <strong>Адрес:</strong> {order.customerInfo.address}
                          </p>
                        )}
                        <p>
                          <strong>Тип заказа:</strong>{" "}
                          {order.customerInfo.orderType === "takeaway" ? "С собой (доставка)" : "В заведении"}
                        </p>
                        {order.customerInfo.comment && (
                          <p>
                            <strong>Комментарий:</strong> {order.customerInfo.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders
