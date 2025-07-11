"use client"

import { useState } from "react"
import Header from "./components/Header"
import MenuSection from "./components/MenuSection"
import Cart from "./components/Cart"
import Inventory from "./components/Inventory"
import Orders from "./components/Orders"
import "./App.css"

const menuData = {
  Menu: [
    {
      id: 1,
      name: "French Cheese",
      description: "Булочка, канадская сосиска, сыр чеддер, фирменный соус, сырный соус",
      price: 25000,
      stock: 15,
      image: "/french-cheese.png",
    },
    {
      id: 2,
      name: "German Dog",
      description: "Булочка, охотничья колбаска, жареный лук, соус барбекю",
      price: 25000,
      stock: 12,
      image: "/german-dog.png",
    },
    {
      id: 3,
      name: "Classic Hot-Dog",
      description: "Булочка, канадская сосиска, айсберг, помидор, жареная морковь, фирменный соус, кетчуп Heinz",
      price: 15000,
      stock: 18,
      image: "/classic-hot-dog.png",
    },
    {
      id: 4,
      name: "French Dog",
      description: "Булочка, канадская сосиска, фирменный соус, кетчуп Heinz",
      price: 20000,
      stock: 25,
      image: "/french-dog.png",
    },
    {
      id: 5,
      name: "Submarine Dog",
      description: "Булочка, канадская сосиска, жареная морковь, помидор, корейская капуста, фирменный соус, кетчуп Heinz",
      price: 15000,
      stock: 20,
      image: "/submarine-dog.png",
    },
    {
      id: 6,
      name: "Bavarian Lunch Box",
      description: "Картошка фри, охотничья сосиска, сырный соус",
      price: 25000,
      stock: 10,
      image: "/bavarian-lunchbox.png",
    },
    {
      id: 7,
      name: "Chicken Balls",
      description: "Куриные филе, сыр чеддер (3x - 15000 / 5x - 20000)",
      price: 20000,
      stock: 22,
      image: "/chicken-balls.png",
    },
    {
      id: 8,
      name: "French Fries",
      description: "Картошка, фирменная специя",
      price: 15000,
      stock: 16,
      image: "/french-fries.png",
    }
  ]
}


function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showOrders, setShowOrders] = useState(false)
  const [orders, setOrders] = useState([])
  const [ingredientsInventory, setIngredientsInventory] = useState([
    { id: "ing1", name: "Сосиски говяжьи", category: "Мясные изделия", unit: "шт", stock: 25, price: 8000 },
    { id: "ing2", name: "Сосиски куриные", category: "Мясные изделия", unit: "шт", stock: 18, price: 7000 },
    { id: "ing3", name: "Сыр ", category: "Молочные продукты", unit: "шт", stock: 12, price: 15000 },
    { id: "ing4", name: "Сыр моцарелла", category: "Молочные продукты", unit: "шт", stock: 8, price: 18000 },
    { id: "ing5", name: "Булочки для бургеров", category: "Хлебобулочные", unit: "шт", stock: 45, price: 500 },
    { id: "ing6", name: "Булочки для хотдогов", category: "Хлебобулочные", unit: "шт", stock: 60, price: 400 },
    { id: "ing7", name: "Лаваш тонкий", category: "Хлебобулочные", unit: "шт", stock: 35, price: 300 },
    { id: "ing8", name: "Лаваш толстый", category: "Хлебобулочные", unit: "шт", stock: 28, price: 350 },,
    { id: "ing9", name: "Упаковка для хотдогов", category: "Упаковка", unit: "шт", stock: 100, price: 50 },
    { id: "ing10", name: "Упаковка для бургеров", category: "Упаковка", unit: "шт", stock: 80, price: 75 },
  ])
  const [inventory, setInventory] = useState(() => {
    const initialInventory = {}
    Object.values(menuData)
      .flat()
      .forEach((item) => {
        initialInventory[item.id] = item.stock
      })
    return initialInventory
  })

  const addIngredient = (ingredient) => {
    const newId = `ing${Date.now()}`
    setIngredientsInventory((prev) => [...prev, { ...ingredient, id: newId }])
  }

  const removeIngredient = (id) => {
    setIngredientsInventory((prev) => prev.filter((item) => item.id !== id))
  }

  const addToCart = (item, quantity) => {
    if (quantity <= 0) return

    const availableStock = inventory[item.id]
    if (quantity > availableStock) {
      alert(`Недостаточно товара на складе. Доступно: ${availableStock}`)
      return
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity }]
      }
    })

    setInventory((prev) => ({
      ...prev,
      [item.id]: prev[item.id] - quantity,
    }))
  }

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (id) => {
    const item = cart.find((cartItem) => cartItem.id === id)
    if (item) {
      setInventory((prev) => ({
        ...prev,
        [id]: prev[id] + item.quantity,
      }))
    }

    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Функция создания заказа
  const createOrder = (items, total, customerInfo) => {
    console.log("Создание заказа:", { items, total, customerInfo }) // Для отладки

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...items],
      total: total,
      customerInfo: customerInfo,
      status: "Новый",
    }

    console.log("Новый заказ:", newOrder) // Для отладки

    setOrders((prevOrders) => {
      const updatedOrders = [newOrder, ...prevOrders]
      console.log("Обновленный список заказов:", updatedOrders) // Для отладки
      return updatedOrders
    })

    setCart([]) // Очистить корзину после оформления заказа

    // Показать уведомление об успешном заказе
    alert(`Заказ #${newOrder.id} успешно оформлен! Мы свяжемся с вами в ближайшее время.`)
  }

  // Функция для открытия/закрытия заказов
  const handleOrdersClick = () => {
    console.log("Клик по заказам, текущие заказы:", orders) // Для отладки
    setShowOrders(!showOrders)
  }

  return (
    <div className="App">
      <Header
        cartCount={getTotalItems()}
        onCartClick={() => setShowCart(!showCart)}
        onOrdersClick={handleOrdersClick}
        ordersCount={orders.length}
      />

      {showCart && (
        <Cart
          items={cart}
          total={getTotalPrice()}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onClose={() => setShowCart(false)}
          onCreateOrder={createOrder}
        />
      )}

      {showOrders && <Orders orders={orders} onClose={() => setShowOrders(false)} />}

      <main className="main-content">
        {Object.entries(menuData).map(([category, items]) => (
          <MenuSection
            key={category}
            title={category}
            items={items.map((item) => ({
              ...item,
              stock: inventory[item.id],
            }))}
            onAddToCart={addToCart}
          />
        ))}
      </main>

      <Inventory items={ingredientsInventory} onAddIngredient={addIngredient} onRemoveIngredient={removeIngredient} />
    </div>
  )
}

export default App
