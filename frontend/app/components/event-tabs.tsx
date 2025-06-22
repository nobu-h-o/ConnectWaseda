"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Event } from "../types/event";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function EventTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events/`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError('Error loading events. Please try again later.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = (events: Event[]) => {
    return events.filter(event => {
      const matchesSearch = searchTerm === "" || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.includes(event.category);

      return matchesSearch && matchesCategories;
    });
  };

  const getFilteredEvents = () => {
    const filteredEvents = filterEvents(events);
    if (activeTab === 0) {
      return filteredEvents.filter(event => !event.club_rep);
    } else if (activeTab === 1) {
      return filteredEvents.filter(event => event.club_rep);
    }
    return filteredEvents;
  };

  const formatEventDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`);
    return eventDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

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

  const categories = [
    "Language-Focused",
    "Dance",
    "Career",
    "Volunteering",
    "Art",
    "Sports",
    "Tech",
    "Cultural Exchange",
    "Music",
    "Science",
    "Food",
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
        {error && (
          <div className="text-red-500 mb-4 p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading events...</div>
        ) : (
          <>
            {activeTab !== 2 && (
              <>
                <h2 className="text-2xl font-semibold mt-8 mb-2">{tabItems[activeTab].title}</h2>
                <p className="mb-8">{tabItems[activeTab].description}</p>
                
                <div className="eventCards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center text-black">
                  {getFilteredEvents().map((event) => (
                    <Link href={`/eventdetails/${event.id}`} key={event.id}>
                      <div className="bg-[#ffece3] p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                        <div className="flex flex-col h-full">
                          <div className="mb-4">
                            <span className="bg-[#ff7230]/20 text-[#ff7230] px-3 py-1 rounded-full text-sm">
                              {event.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 flex-grow">
                            {event.description.length > 100
                              ? `${event.description.substring(0, 100)}...`
                              : event.description}
                          </p>
                          <div className="mt-auto">
                            <p className="text-sm text-gray-500">
                              📅 {formatEventDate(event.start_date, event.start_time)}
                            </p>
                            <p className="text-sm text-gray-500">
                              👥 {event.capacity ? `${event.booked}/${event.capacity}` : 'Unlimited'} spots
                            </p>
                            <p className="text-sm text-gray-500">
                              📍 {event.on_campus ? 'On Campus' : 'Off Campus'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="e.g. GDG, TedX, Dance"
                    className="px-4 py-2 w-[60%] bg-[#ffece3] rounded-full text-black border-none"
                  />
                </div>

                <h2 className="text-2xl font-semibold mt-20 mb-10">
                  Filter by Category
                </h2>
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 gap-x-24 gap-y-8 text-left rounded-2xl cursor-pointer text-[#2c3050] bg-[#ffece3] p-10 w-[60%] mx-auto">
                    {categories.map((category, i) => (
                      <label key={i} className="flex items-center cursor-pointer space-x-2 text-lg sm:text-xl md:text-2xl">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, category]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== category));
                            }
                          }}
                          className="accent-[#ff7230] border-none"
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Search Results */}
                {(searchTerm || selectedCategories.length > 0) && (
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-6">Search Results</h3>
                    <div className="eventCards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center text-black">
                      {getFilteredEvents().map((event) => (
                        <Link href={`/eventdetails/${event.id}`} key={event.id}>
                          <div className="bg-[#ffece3] p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                            <div className="flex flex-col h-full">
                              <div className="mb-4">
                                <span className="bg-[#ff7230]/20 text-[#ff7230] px-3 py-1 rounded-full text-sm">
                                  {event.category}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                              <p className="text-gray-600 text-sm mb-4 flex-grow">
                                {event.description.length > 100
                                  ? `${event.description.substring(0, 100)}...`
                                  : event.description}
                              </p>
                              <div className="mt-auto">
                                <p className="text-sm text-gray-500">
                                  📅 {formatEventDate(event.start_date, event.start_time)}
                                </p>
                                <p className="text-sm text-gray-500">
                                  👥 {event.capacity ? `${event.booked}/${event.capacity}` : 'Unlimited'} spots
                                </p>
                                <p className="text-sm text-gray-500">
                                  📍 {event.on_campus ? 'On Campus' : 'Off Campus'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}