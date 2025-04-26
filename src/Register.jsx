import React, { useState } from 'react';
import { auth, db } from './firebase';  
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState(''); 
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        address: address,  
        createdAt: new Date(),
      });

      setMessage('Kayıt başarılı!');
    } catch (error) {
      setMessage('Hata: ' + error.message);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>VT Firebase Web Projesi</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="text"
          placeholder="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}  
        />
        <button onClick={handleRegister}>Kayıt Ol</button>

        <p>Hesabınız var mı? <button onClick={navigateToLogin}>Giriş Yap</button></p>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Register;
