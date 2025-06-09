'use client';

import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuLogOut } from "react-icons/lu";
import { useSelector } from 'react-redux';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>(''); // Empty initially
  const [email,setEmail] = useState<string|null>("");
  const router = useRouter();

  const lang = useSelector((state:RootState)=>state.language.language);



  useEffect(()=>{
    if(typeof window === "undefined"){
      return;
    }else{
      setEmail(localStorage.getItem("email"))
    }
  },[])

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(formatted);
    };

    updateTime(); // set initial time
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]); // 👈 Rerun if language changes

  const handleLogout = () => {
    console.log('Logout clicked');
    router.push('/signin');
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-between items-center border-t px-4 py-3 text-sm text-gray-700 bg-white shadow z-50">
      <span>{currentTime}</span>
      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-md font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5.121 17.804A4.002 4.002 0 019 15h6a4.002 4.002 0 013.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {email}
      </span>
      <button
        className="text-red-600 font-medium hover:underline text-3xl"
        onClick={handleLogout}
      >
        <LuLogOut />
      </button>
    </footer>
  );
}
