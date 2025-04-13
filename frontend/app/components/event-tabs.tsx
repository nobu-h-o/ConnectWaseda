"use client";

import { useState } from "react";
import Image from "next/image";

export default function EventTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabItems = [
    {
      title: "Events Hosted By Waseda",
      description: "Here you can find events organized by Waseda University.",
    },
    {
      title: "Created & Hosted By Students",
      description: "Discover events created by students for students.",
    },
  ];

  return (
    <>
      {/* Tabs */}
      <div className="tabs flex">
        <div
          className={`tab1 ${activeTab === 0 ? "active-tab" : ""} rounded-tr-lg`}
          onClick={() => setActiveTab(0)}
          style={{ padding: "1rem", cursor: "pointer", flex: 1 }}
        >
          <Image
            src="/images/gradcap.png"
            alt="Graduation Cap"
            width={64}
            height={64}
          />
          <p>Events Hosted By Waseda</p>
        </div>

        <div
          className={`tab2 ${activeTab === 1 ? "active-tab" : ""} rounded-tl-lg rounded-tr-lg`}
          onClick={() => setActiveTab(1)}
          style={{ padding: "1rem", cursor: "pointer", flex: 1 }}
        >
          <Image
            src="/images/students.png"
            alt="Students"
            width={48}
            height={48}
          />
          <p>Created & Hosted By Students</p>
        </div>

        <div
          className={`tab3 ${activeTab === 2 ? "active-tab" : ""} rounded-tl-lg`}
          onClick={() => setActiveTab(2)}
          style={{ padding: "1rem", cursor: "pointer", flex: 1 }}
        >
          <Image
            src="/images/searchicon.png"
            alt="Search Icon"
            width={48}
            height={48}
          />
          <p>Search By Organization/Category</p>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 0 && (
          <>
            <h2 className="text-2xl font-semibold mt-8 mb-2">{tabItems[0].title}</h2>
            <p className="mb-1">{tabItems[0].description}</p>
            
            <div className="eventCards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center text-black transition-all duration-300">
  {Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className="bg-[#ffece3] h-80 min-w-[15rem] sm:w-[18rem] lg:w-[20rem] px-6 py-4 flex items-center justify-center text-xl rounded-lg sm:rounded-md lg:rounded-full shadow"
    >
      Waseda Event {i + 1}
    </div>
    ))}
    </div>

          </>
        )}

        {activeTab === 1 && (
          <>
            <h2 className="text-2xl font-semibold mt-8 mb-2">{tabItems[1].title}</h2>
            <p className="mb-1">{tabItems[1].description}</p>
            <div className="eventCards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center text-black transition-all duration-300">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="bg-[#ffece3] h-40 flex items-center justify-center text-xl rounded-xl shadow"
                >
                  Student Event {i + 1}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 2 && (
          <>
            <h2 className="text-2xl font-semibold mt-8 mb-2">
              Search By Keyword
            </h2>
            <p className="mb-8">
              Find events based on clubs, societies, or categories.
            </p>
            <div className="flex flex-col gap-4 items-center">
              <input
                type="text"
                placeholder="e.g. GDG, TedX, Dance"
                className="px-4 py-2 w-[60%] bg-[#ffece3] rounded-full text-black border-none"
              />
              <button className="bg-[#a0a7e0b7] px-8 py-4 mt-5 rounded-full shadow hover:brightness-110 text-white">
                Search
              </button>
            </div>
                {/* Categories */}
                <h2 className="text-2xl font-semibold mt-20 mb-10">
              Filter by Category
            </h2>
            <div className="flex justify-center">
  <div className="grid grid-cols-2 gap-x-24 gap-y-8 text-left rounded-2xl cursor-pointer text-[#2c3050] bg-[#ffece3] p-10 w-[60%] mx-auto">
    {[
      "Language-Focused",
      "Dance",
      "Career",
      "Volunteering",
      "Art",
      "Sports",
      "Tech",
      "Cultural Exchange",
      "Art",
      "Music",
      "Science",
      "Food",
    ].map((category, i) => (
      <label key={i} className="flex items-center cursor-pointer space-x-2 text-lg sm:text-xl md:text-2xl">
        <input type="checkbox" className="accent-[#ff7230] border-none" />
        <span>{category}</span>
      </label>
    ))}
  </div>
</div>

        {/* Search Button */}
        <div className="mt-10 flex justify-center">
        <button className="bg-[#a0a7e0b7] px-8 py-4 rounded-full shadow hover:brightness-110 text-white">
                Search
              </button>
    </div>
          </>
        )}
      </div>
    </>
  );
}