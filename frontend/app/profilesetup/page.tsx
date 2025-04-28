import Header from "@/app/components/header";
import Link from "next/link"; // Import the Link component

export default function CreateProfile() {
  return (
    <div className="min-h-screen bg-[#2c3050] text-white px-6 py-8 flex flex-col items-center">
      <Header />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="w-full max-w-3xl mb-4">
        <Link href="/" className="text-sm text-gray-300 hover:text-white transition">
          ← Back to Home
        </Link>
      </nav>

      {/* Title + Stepper */}
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Create Your Profile</h1>
        <p className="text-lg text-gray-300 mb-4">Step 1 of 3</p>
        <div className="flex items-center justify-center space-x-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={
                n === 1
                  ? "w-8 h-8 rounded-full bg-[#FFECE3] text-[#2c3050] flex items-center justify-center font-bold"
                  : "w-8 h-8 rounded-full bg-[#A0A7E0]/70 text-gray-200 flex items-center justify-center"
              }
            >
              {n}
            </div>
          ))}
        </div>
      </header>

      {/* Form Card */}
      <form
        aria-label="Create Profile Form"
        className="w-full max-w-3xl bg-[#A0A7E0] text-[#2c3050]
                   rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2
                   gap-x-6 gap-y-6"
      >
        {/* Name */}
        <label htmlFor="name" className="text-lg font-medium">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your full name"
          className="w-full rounded-full px-4 py-3 text-base text-center
                     bg-[#FFECE3] placeholder-gray-500 focus:outline-none
                     focus:ring-2 focus:ring-[#FF7230]"
        />

        {/* Major */}
        <label htmlFor="major" className="text-lg font-medium">
          Department / Major<span className="text-red-500">*</span>
        </label>
        <select
          id="major"
          name="major"
          required
          defaultValue=""
          className="w-full rounded-full px-4 py-3 text-base text-center
                     bg-[#FFECE3] placeholder-gray-500 appearance-none
                     hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF7230]"
        >
          <option value="" disabled>
            Select major
          </option>
          <option>PSE</option>
          <option>SILS</option>
          <option>Law</option>
          <option>CMS</option>
          <option>Edu</option>
          <option>SOC</option>
          <option>FSE</option>
        </select>

        {/* Graduation */}
        <label htmlFor="grad" className="text-lg font-medium">
          Graduation Date<span className="text-red-500">*</span>
        </label>
        <input
          id="grad"
          name="grad"
          type="month"
          required
          className="w-full rounded-full px-4 py-3 text-base text-center
                     bg-[#FFECE3] placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-[#FF7230]
                     hover:cursor-pointer"
        />

        {/* Phone */}
        <label htmlFor="phone" className="text-lg font-medium">
          Phone Number<span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="080-1234-5678"
          className="w-full rounded-full px-4 py-3 text-base text-center
                     bg-[#FFECE3] placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-[#FF7230]"
        />
      </form>

      {/* Original "Next" button outside the form */}
      <button
        className="mt-8 bg-[#A0A7E0] rounded-full px-10 py-5 text-base font-medium
                   transition-all duration-200 hover:brightness-105 mx-auto"
      >
        Next
      </button>
    </div>
  );
}
