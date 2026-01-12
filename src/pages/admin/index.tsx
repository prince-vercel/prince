/* eslint-disable react-hooks/set-state-in-effect */


import React, { useEffect, useState } from 'react';
import Boxes from '@/src/components/AdminComponents/Boxes';
import { db } from '@/src/lib/firebase';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı oturumunu localStorage ile kontrol et
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }
    setIsAdmin(true);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 80 }}>Yükleniyor...</div>;
  }
  if (!isAdmin) {
    return null;
  }
  return (
    <div className="flex">
      <Boxes />
    </div>
  );
};

export default AdminPanel;