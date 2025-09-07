"use client";

import Link from "next/link";
import HamburgerButton from "@/layouts/hamburger-button";
import SearchWidget from "@/components/search/search";
import Sidebar from "@/layouts/hydrogen/sidebar";
import HeaderMenuRight from "@/layouts/header-menu-right";
import StickyHeader from "@/layouts/sticky-header";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setLanguage } from "@/store/slices/languageSlice";
import Image from "next/image";

export default function Header() {
  const [isSuperAdminL,setIsSuperAdminL] = useState<string|null>("")
  const [showSearchWidget,setShowSearchWidget] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const pathname = usePathname();

  const shouldStick = pathname === "/station/new-station" || pathname === "/station/update-station"

  useEffect(()=>{
      if(pathname === "/pumps") {
        setShowSearchWidget(true)
      }else{
        setShowSearchWidget(false);
      }
  },[pathname])


  useEffect(()=>{
    if(typeof window !=="undefined"){
      setIsSuperAdminL(localStorage.getItem("isSuperAdmin"));
    }else{
      return;
    }
  },[])

  
  const dispatch = useDispatch();
  const selectedLang = useSelector((state: RootState) => state.language.language);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };

  useEffect(() => {
    if (isSuperAdminL === "true") {
      setIsSuperAdmin(true);
    } else {
      setIsSuperAdmin(false);
    }
  }, [isSuperAdminL]);

  return (
    <StickyHeader className={`z-[990] h-16 2xl:py-5 3xl:px-8 4xl:px-10 ${shouldStick?"sticky":""}`}>
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton view={<Sidebar className="static w-full 2xl:w-full" />} />
          <div className="relative w-32 h-10">
            <Link
              href={"/"}
              aria-label="Site Logo"
              className=" me-4 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
            >
              <Image
              src="/Logo.jpeg"
              fill
              className="object-contain"
              alt="Websit Logo"
              />
            </Link>
          </div>

        {/* Language Selector */}
        <div className="relative hidden md:block ml-4 hover:scale-95 transition-all duration-300">
            <select
              value={selectedLang}
              onChange={handleLangChange}
              className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 text-sm rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:cursor-pointer"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
      </div>
      {showSearchWidget && (
        <SearchWidget />
      )}
      <HeaderMenuRight />
    </StickyHeader>
  );
}
