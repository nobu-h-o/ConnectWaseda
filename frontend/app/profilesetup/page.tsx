import Header from "@/app/components/header"

export default function CreateProfile() {
    return (
      <div className="min-h-screen bg-[#2c3050] text-white px-8 py-6 flex flex-col items-center">
        <Header />  
        {/* Title */}
        <div className="flex items-center justify-center mb-6 space-x-4">
          <h1 className="text-3xl font-bold">Create Your Profile</h1>
          <p>Step 1 of 3</p>
        </div>
  
        {/* Form container */}
        <div className="bg-[#A0A7E0] text-[#2c3050] w-3/5 text-xl px-12 py-6 rounded-xl mx-auto">
  
          {/* Name */}
          <div className="flex justify-between items-center my-4">
            <label htmlFor="name" className="flex-1">Name</label>
            <input
              type="text"
              id="name"
              name="fname"
              className="flex-1 max-w-[40%] text-right px-5 py-3 bg-[#FFECE3] rounded-full"
            />
          </div>
  
          {/* Department/Major as dropdown */}
          <div className="flex justify-between items-center my-4">
            <label htmlFor="major" className="flex-1">Department/Major</label>
            <select
              id="major"
              name="major"
              className="flex-1 max-w-[40%] px-5 py-3 bg-[#FFECE3] rounded-full text-center hover:cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>
                Select major
              </option>
              <option value="PSE">PSE</option>
              <option value="SILS">SILS</option>
              <option value="Law">Law</option>
              <option value="CMS">CMS</option>
              <option value="Edu">Edu</option>
              <option value="SOC">SOC</option>
              <option value="FSE">FSE</option>
            </select>
          </div>
  
          {/* Graduation Date: month & year dropdowns */}
          <div className="flex justify-between items-center my-4">
            <label className="flex-1">Graduation Date</label>
            <div className="flex flex-1 max-w-[40%] justify-between">
              <select
                id="gradMonth"
                name="gradMonth"
                className="w-1/2 px-5 py-3 bg-[#FFECE3] rounded-full mr-2 text-center hover:cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Month</option>
                {[
                  "January","February","March","April",
                  "May","June","July","August",
                  "September","October","November","December"
                ].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                id="gradYear"
                name="gradYear"
                className="w-1/2 px-5 py-3 bg-[#FFECE3] rounded-full ml-2 text-center hover:cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Year</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i)
                  .map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))
                }
              </select>
            </div>
          </div>
  
          {/* Phone */}
          <div className="flex justify-between items-center my-4">
            <label htmlFor="phone" className="flex-1">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="flex-1 max-w-[40%] text-right px-5 py-3 bg-[#FFECE3] rounded-full"
            />
          </div>
        </div>
  
        {/* Next button */}
        <button
  className="mt-8 bg-[#A0A7E0] rounded-full px-10 py-5 text-base font-medium transition-all duration-200 hover:brightness-105 mx-auto"
>
  Next
</button>
      </div>
    );
  }