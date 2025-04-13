"use client"

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <header className="">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-[#ff7230] text-2xl font-semibold">
          ConnectWaseda
        </div>

        <div className="flex items-center space-x-10">
          <p className="text-white cursor-pointer">About Us</p>
          <p className="text-white cursor-pointer">FAQ</p>
          <p className="text-white cursor-pointer">Contact</p>

          <Link href="/signin">
            <div className="bg-[rgba(160,167,224,0.72)] px-6 py-3 rounded-full shadow transition duration-200 hover:shadow-lg hover:brightness-110 cursor-pointer">
              <p className="text-white">Sign In</p>
            </div>
          </Link>
        </div>
        <p>About Us</p>
        <p>FAQ</p>
        <p>Contact</p>
        
        {isAuthenticated ? (
          <div 
            className="signIn" 
            onClick={() => signOut({ callbackUrl: '/home' })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                signOut({ callbackUrl: '/home' })
              }
            }}
          >
            <p>Sign Out</p>
          </div>
        ) : (
          <Link href="/signin">
            <div className="signIn">
              <p>Sign In</p>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}