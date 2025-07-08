import '../App.css'
"use client"

const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo fade-in-down">
          <img src="/av-logo.png" alt="" class="avenue-logo fade-in-down" />
          <span><p class="av-logo-text fade-in-down">Avenue</p>
          <p class="av-logo-text-scnd fade-in-down">Hotdogs</p></span>
        </div>



        <button className="cart-button fade-in-down" onClick={onCartClick}>
          <span className="cart-icon"><i class="bi bi-cart3"></i></span>
          <span>Корзина</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </header>
  )
}

export default Header
