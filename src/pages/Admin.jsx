function AdminPage({ ingredientsInventory, onAddIngredient, onRemoveIngredient }) {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (password) => {
    if (password === "admin123") setAuthenticated(true);
    else alert("Неверный пароль");
  };

  return authenticated ? (
    <Inventory
      items={ingredientsInventory}
      onAddIngredient={onAddIngredient}
      onRemoveIngredient={onRemoveIngredient}
    />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}
