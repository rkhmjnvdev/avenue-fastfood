import "../App.css"
;("use client")

const Header = ({ cartCount, onCartClick, onOrdersClick, ordersCount }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo fade-in-down">
          <img src="/av-logo.png" alt="" className="avenue-logo fade-in-down" />
          <span>
            <p className="av-logo-text fade-in-down">Avenue</p>
            <p className="av-logo-text-scnd fade-in-down">Hotdogs</p>
          </span>
        </div>

        <div className="header-buttons">
          <button className="orders-button fade-in-down" onClick={onOrdersClick}>
            <span className="orders-icon">
              <i className="bi bi-clipboard-check"></i>
            </span>
            <span>Заказы</span>
            {ordersCount > 0 && <span className="orders-count">{ordersCount}</span>}
          </button>

          <button className="cart-button fade-in-down" onClick={onCartClick}>
            <span className="cart-icon">
              <i className="bi bi-cart3"></i>
            </span>
            <span>Корзина</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
