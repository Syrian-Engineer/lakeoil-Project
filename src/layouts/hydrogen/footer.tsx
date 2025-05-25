'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuLogOut } from "react-icons/lu";


export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>(() =>
    new Date().toLocaleTimeString()
  );
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    console.log('Logout clicked');
    // Perform any logout logic here (e.g., clearing session/token)
    router.push('/signin');
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-between items-center border-t px-4 py-3 text-sm text-gray-700 bg-white shadow z-50">
      <span>{currentTime}</span>
      <button
        className="text-red-600 font-medium hover:underline text-3xl"
        onClick={handleLogout}
      >
        <LuLogOut />
      </button>
    </footer>
  );
}
