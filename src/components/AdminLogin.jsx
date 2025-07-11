import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Введите пароль для доступа</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px' }}>Войти</button>
    </form>
  );
};

export default AdminLogin;
