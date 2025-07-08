"use client"

import { useState } from "react"

const ProductCard = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0)
  const [isAdding, setIsAdding] = useState(false)

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(0, Math.min(item.stock, quantity + delta))
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      setIsAdding(true)
      onAddToCart(item, quantity)
      setTimeout(() => {
        setIsAdding(false)
        setQuantity(0)
      }, 300)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " сум"
  }

  return (
    <div className={`product-card ${isAdding ? "adding" : ""}`}>
      <div className="product-image">
        <img src={item.image || "/placeholder.svg"} alt={item.name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{item.name}</h3>
        <p className="product-description">{item.description}</p>
        <div className="product-price">{formatPrice(item.price)}</div>

        <div className="quantity-controls">
          <button className="quantity-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 0}>
            −
          </button>
          <span className="quantity">{quantity}</span>
          <button className="quantity-btn" onClick={() => handleQuantityChange(1)} disabled={quantity >= item.stock}>
            +
          </button>
        </div>

        <button
          className={`add-to-cart-btn ${quantity > 0 ? "active" : ""}`}
          onClick={handleAddToCart}
          disabled={quantity <= 0 || item.stock <= 0}
        >
          {item.stock <= 0 ? "Нет в наличии" : quantity > 0 ? "Добавить в корзину" : "Выберите количество"}
        </button>

        {item.stock <= 5 && item.stock > 0 && <div className="low-stock">Осталось: {item.stock}</div>}
      </div>
    </div>
  )
}

export default ProductCard
