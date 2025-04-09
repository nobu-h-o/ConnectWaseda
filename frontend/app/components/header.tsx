"use client"

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <header>
      <div className="header">
        <div className="projectName">
          <p>ConnectWaseda</p>
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