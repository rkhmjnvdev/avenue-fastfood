"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MenuSection from "./components/MenuSection";
import Cart from "./components/Cart";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";
import AdminLogin from "./components/AdminLogin";
import "./App.css";

function MainApp({
  cart,
  showCart,
  showOrders,
  orders,
  inventory,
  ingredientsInventory,
  getTotalItems,
  getTotalPrice,
  updateCartQuantity,
  removeFromCart,
  createOrder,
  addToCart,
  setShowCart,
  setShowOrders,
  addIngredient,
  removeIngredient,
}) {
  return (
    <div className="App">
      <Header
        cartCount={getTotalItems()}
        onCartClick={() => setShowCart((prev) => !prev)}
        onOrdersClick={() => setShowOrders((prev) => !prev)}
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
        <MenuSection
          title="Menu"
          items={inventory}
          onAddToCart={addToCart}
        />
      </main>
    </div>
  );
}

function AdminPage({ inventory, onAddIngredient, onRemoveIngredient }) {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (password) => {
    if (password === "admin123") setAuthenticated(true);
    else alert("Неверный пароль");
  };

  return authenticated ? (
    <Inventory items={inventory} onAddIngredient={onAddIngredient} onRemoveIngredient={onRemoveIngredient} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ingredientsInventory, setIngredientsInventory] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/ingredients/")
      .then((res) => setIngredientsInventory(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:8000/api/products/")
      .then((res) => setInventory(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addIngredient = (ingredient) => {
    const newId = `ing${Date.now()}`;
    setIngredientsInventory((prev) => [...prev, { ...ingredient, id: newId }]);
  };

  const removeIngredient = (id) => {
    setIngredientsInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (item, quantity) => {
    if (quantity <= 0) return;
    if (quantity > item.stock) return alert(`Недостаточно товара. Осталось: ${item.stock}`);

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      return existing
        ? prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i))
        : [...prev, { ...item, quantity }];
    });

    setInventory((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, stock: p.stock - quantity } : p))
    );
  };

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) removeFromCart(id);
    else setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      setInventory((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: p.stock + item.quantity } : p))
      );
    }
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const createOrder = (items, total, customerInfo) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items,
      total,
      customerInfo,
      status: "Новый",
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    alert(`Заказ #${newOrder.id} успешно оформлен!`);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainApp
              cart={cart}
              showCart={showCart}
              showOrders={showOrders}
              orders={orders}
              inventory={inventory}
              ingredientsInventory={ingredientsInventory}
              getTotalItems={getTotalItems}
              getTotalPrice={getTotalPrice}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
              addToCart={addToCart}
              setShowCart={setShowCart}
              setShowOrders={setShowOrders}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPage
              inventory={ingredientsInventory}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
