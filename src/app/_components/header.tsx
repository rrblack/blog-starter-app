"use client";

import Link from "next/link";
import LanguageSwitcher from "./language-switcher";

const Header = () => {
  return (
   <div> 
    <div className="flex justify-end">
      <LanguageSwitcher/>
      </div> 
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
      <Link href="/" className="inline-block transform transition-transform hover:scale-105 text-red-500">
        Kyle's Japan Life
      </Link>
    </h2>
    </div>
      
  );
};

export default Header;
