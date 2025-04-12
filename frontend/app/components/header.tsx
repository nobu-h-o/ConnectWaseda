import Link from "next/link";

export default function Header() {
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
      </div>
    </header>
  );
}