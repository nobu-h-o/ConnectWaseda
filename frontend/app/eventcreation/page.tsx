import React from "react";

const CreateEvent = () => {
  const categories = ["Social", "Academic", "Sports", "Cultural"];
  const languages = ["English", "Japanese", "Other"];

  return (
    <div className="bg-[#2c3050] min-h-screen flex flex-col items-center pt-16 pb-16">
      {/* Page Title */}
      <h1 className="text-white text-4xl font-semibold mb-10">
        Create A New Event
      </h1>

      {/* Form Container */}
      <div className="bg-[#A0A7E0]/80 rounded-2xl w-full max-w-2xl px-12 py-14 space-y-8">
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="title"
            className="text-white text-lg font-medium"
          >
            Title of Event
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter event title"
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                       text-base placeholder-gray-600 text-[#2c3050]
                       focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-white text-lg font-medium"
          >
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Describe your event"
            className="w-full rounded-xl bg-[#FFECE3] px-5 py-3 
                       text-base placeholder-gray-600 text-[#2c3050]
                       focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="category"
            className="text-white text-lg font-medium"
          >
            Event Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue=""
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                       text-base text-[#2c3050] placeholder-gray-600
                       appearance-none hover:cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          >
            <option value="" disabled>
              Select event category
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="language"
            className="text-white text-lg font-medium"
          >
            Event Language
          </label>
          <select
            id="language"
            name="language"
            defaultValue=""
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                       text-base text-[#2c3050] placeholder-gray-600
                       appearance-none hover:cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          >
            <option value="" disabled>
              Select event language
            </option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="date"
            className="text-white text-lg font-medium"
          >
            Event Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                       text-base text-[#2c3050]
                       focus:outline-none focus:ring-2 focus:ring-[#FFA500]
                       hover:cursor-pointer"
          />
        </div>

        {/* Start & End Time */}
        <div className="flex flex-col space-y-2">
          <span className="text-white text-lg font-medium">Event Time</span>
          <div className="flex gap-6">
            {["startTime", "endTime"].map((field, idx) => (
              <div key={field} className="flex-1 flex flex-col space-y-1">
                <label
                  htmlFor={field}
                  className="text-white text-base font-medium"
                >
                  {idx === 0 ? "Start Time" : "End Time"}
                </label>
                <input
                  id={field}
                  name={field}
                  type="time"
                  className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                             text-base text-[#2c3050]
                             focus:outline-none focus:ring-2 focus:ring-[#FFA500]
                             hover:cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="notes"
            className="text-white text-lg font-medium"
          >
            Notes from the Host
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Additional information for attendees"
            className="w-full rounded-xl bg-[#FFECE3] px-5 py-3 
                       text-base placeholder-gray-600 text-[#2c3050]
                       focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="bg-[#FFECE3] text-[#2c3050] 
                       rounded-full px-10 py-4 text-lg font-semibold
                       hover:brightness-105 transition"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;