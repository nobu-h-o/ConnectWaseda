import React from "react";

const CreateEvent = () => {
  return (
    <div className="bg-[#2c3050] min-h-screen p-8 text-white">
      <h1 className="text-2xl mb-6">Create A New Event</h1>

      <div className="bg-[rgba(160,167,224,0.72)] w-[70%] p-8 rounded-2xl flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="eventtitle" className="mb-2 font-bold">Title of Event</label>
          <input type="text" id="eventtitle" name="eventtitle" className="p-3 bg-[#FFECE3] rounded-md text-black" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-bold">Event Description</label>
          <input type="text" id="description" name="description" className="p-3 bg-[#FFECE3] rounded-md text-black" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2 font-bold">Event Category</label>
          <input type="text" id="category" name="category" className="p-3 bg-[#FFECE3] rounded-md text-black" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="language" className="mb-2 font-bold">Event Language</label>
          <input type="text" id="language" name="language" className="p-3 bg-[#FFECE3] rounded-md text-black" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="mb-2 font-bold">Event Date</label>
          <input type="date" id="date" name="date" className="p-3 bg-[#FFECE3] rounded-md text-black" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="start-time" className="font-bold">Start Time:</label>
          <input type="time" id="start-time" name="start-time" className="bg-[#FFECE3] text-black p-2 rounded-md w-1/2" />

          <label htmlFor="end-time" className="font-bold">End Time:</label>
          <input type="time" id="end-time" name="end-time" className="bg-[#FFECE3] text-black p-2 rounded-md w-1/2" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="capacity" className="mb-2 font-bold">Event Capacity</label>
          <input type="number" id="capacity" name="capacity" className="p-3 bg-[#FFECE3] rounded-md text-black" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="contact" className="mb-2 font-bold">Contact Info</label>
          <input type="text" id="contact" name="contact" className="p-3 bg-[#FFECE3] rounded-md text-black" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="notes" className="mb-2 font-bold">Notes from the Host</label>
          <input type="text" id="notes" name="notes" className="p-3 bg-[#FFECE3] rounded-md text-black" />
        </div>
      </div>

      <button className="mt-6 mx-auto block text-[#2c3050] bg-[#FFECE3] rounded-full px-6 py-3 text-base font-medium hover:brightness-105 transition">
        Create Event
      </button>
    </div>
  );
};

export default CreateEvent;
