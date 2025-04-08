"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl p-8">
        {/* Logo Section */}
        <div className=" mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Get Started with ConnectWaseda
          </h2>
          <p className="text-gray-500 font-semibold mt-2">
            Sign in with your Waseda Account.
          </p>
        </div>

        {/* Login Section */}
        <div className="space-y-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2
              text-gray-700 bg-white rounded-3xl border border-gray-300
              hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}