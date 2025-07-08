"use client"

import { useState } from "react"

const Inventory = ({ items, onAddIngredient, onRemoveIngredient }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    category: "",
    unit: "",
    stock: 0,
    price: 0,
  })

  const categories = [
    "Мясные изделия",
    "Молочные продукты",
    "Хлебобулочные",
    "Овощи",
    "Соусы",
    "Масла",
    "Специи",
    "Упаковка",
  ]

  const units = ["кг", "л", "шт", "м", "г"]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newIngredient.name && newIngredient.category && newIngredient.unit) {
      onAddIngredient(newIngredient)
      setNewIngredient({ name: "", category: "", unit: "", stock: 0, price: 0 })
      setShowAddModal(false)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      onRemoveIngredient(id)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " сум"
  }

  const getCategoryBadgeColor = (category) => {
    const colors = {
      "Мясные изделия": "#ff6b35",
      "Молочные продукты": "#4ecdc4",
      Хлебобулочные: "#f39c12",
      Овощи: "#27ae60",
      Соусы: "#e74c3c",
      Масла: "#f1c40f",
      Специи: "#9b59b6",
      Упаковка: "#95a5a6",
    }
    return colors[category] || "#6c757d"
  }

  return (
    <section className="inventory-section">
      <div className="inventory-header">
        <h2 className="inventory-title">Склад ингредиентов</h2>
        <button className="add-ingredient-btn" onClick={() => setShowAddModal(true)}>
          + Добавить товар
        </button>
      </div>

      {/* Модальное окно для добавления товара */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Добавить новый товар</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="add-ingredient-form">
              <div className="form-group">
                <label>Название товара</label>
                <input
                  type="text"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                  placeholder="Введите название товара"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Категория</label>
                  <select
                    value={newIngredient.category}
                    onChange={(e) => setNewIngredient({ ...newIngredient, category: e.target.value })}
                    required
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Единица измерения</label>
                  <select
                    value={newIngredient.unit}
                    onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                    required
                  >
                    <option value="">Выберите единицу</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Количество</label>
                  <input
                    type="number"
                    min="0"
                    value={newIngredient.stock}
                    onChange={(e) =>
                      setNewIngredient({ ...newIngredient, stock: Number.parseInt(e.target.value) || 0 })
                    }
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Цена за единицу (сум)</label>
                  <input
                    type="number"
                    min="0"
                    value={newIngredient.price}
                    onChange={(e) =>
                      setNewIngredient({ ...newIngredient, price: Number.parseInt(e.target.value) || 0 })
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Добавить товар
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Название товара</th>
              <th>Категория</th>
              <th>Единица</th>
              <th>Цена за единицу</th>
              <th>Количество в наличии</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={item.stock <= 5 ? "low-stock-row" : ""}>
                <td className="item-name">{item.name}</td>
                <td>
                  <span className="category-badge" style={{ backgroundColor: getCategoryBadgeColor(item.category) }}>
                    {item.category}
                  </span>
                </td>
                <td className="item-unit">{item.unit}</td>
                <td className="item-price">{formatPrice(item.price)}</td>
                <td className="item-stock">
                  {item.stock} {item.unit}
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      item.stock === 0 ? "out-of-stock" : item.stock <= 5 ? "low-stock" : "in-stock"
                    }`}
                  >
                    {item.stock === 0 ? "Нет в наличии" : item.stock <= 5 ? "Заканчивается" : "В наличии"}
                  </span>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)} title="Удалить товар">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Inventory
