"use client"

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <header className="">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/home">
          <div className="text-[#9B2121] text-2xl font-semibold cursor-pointer">
            ConnectWaseda
          </div>
        </Link>

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