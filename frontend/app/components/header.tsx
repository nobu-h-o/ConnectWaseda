import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="header">
        <div className="projectName">
          <p>ConnectWaseda</p>
        </div>
        <p>About Us</p>
        <p>FAQ</p>
        <p>Contact</p>
        <Link href='signin'>
          <div className="signIn">
            <p>Sign In</p>
          </div>
        </Link>
      </div>
    </header>
  )
}

