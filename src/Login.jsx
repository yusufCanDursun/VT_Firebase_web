import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Giriş başarılı!');
      navigate('/profile'); 
    } catch (error) {
      setMessage('Hata: ' + error.message);
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <h1>Giriş Yap</h1>
      <div className="form-container">
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Giriş Yap</button>

        
        <p>Hesabınız yok mu? <button onClick={navigateToRegister}>Kayıt Ol</button></p>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Login;
