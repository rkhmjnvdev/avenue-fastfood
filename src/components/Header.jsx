import '../App.css'
"use client"

const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src="/av-logo.png" alt="" class="avenue-logo" />
          <span><p class="av-logo-text">Avenue</p>
          <p>Hotdogs</p></span>
        </div>

        <h1 className="header-title">Меню ресторана</h1>

        <button className="cart-button" onClick={onCartClick}>
          <span className="cart-icon"><i class="bi bi-cart3"></i></span>
          <span>Корзина</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </header>
  )
}

export default Header
