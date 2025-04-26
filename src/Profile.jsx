import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        navigate('/login'); 
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Çıkış hatası:", error);
    }
  };

  return (
    <div className="container">
      {userData ? (
        <>
          <h1>Hoşgeldin, {userData.name}!</h1>
          <p><strong>E-posta:</strong> {userData.email}</p>
          <p><strong>Adres:</strong> {userData.address}</p>
          <button onClick={handleLogout}>Çıkış Yap</button>
        </>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
}

export default Profile;
