'use client';

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";

// Make sure we have a valid API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
console.log('Using API URL:', API_URL);

interface EventFormData {
  title: string;
  description: string;
  category: string;
  language: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  host_notes: string;
  club_rep: boolean;
  on_campus: boolean;
  capacity: string;
}

// Function to get CSRF token from cookies
function getCsrfToken() {
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const CreateEvent = () => {
  const { status } = useSession();
  const router = useRouter();
  const categories = ["Social", "Academic", "Sports", "Cultural"];
  const languages = ["English", "Japanese", "Other"];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    category: "",
    language: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    host_notes: "",
    club_rep: true,
    on_campus: true,
    capacity: "",
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, starting event creation...');
    
    if (isSubmitting) {
      console.log('Already submitting, ignoring duplicate submission');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Log form data before validation
      console.log('Current form data:', formData);

      // Validate dates and times
      const startDateTime = new Date(`${formData.start_date}T${formData.start_time}`);
      const endDateTime = new Date(`${formData.end_date}T${formData.end_time}`);
      const now = new Date();

      console.log('Validating dates:', {
        startDateTime,
        endDateTime,
        now,
        isStartValid: !isNaN(startDateTime.getTime()),
        isEndValid: !isNaN(endDateTime.getTime())
      });

      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        setError("Please fill in all date and time fields");
        return;
      }

      if (startDateTime < now) {
        setError("Start date/time cannot be in the past");
        return;
      }

      if (endDateTime <= startDateTime) {
        setError("End date/time must be after the start date/time");
        return;
      }

      // Get CSRF token
      const csrfToken = getCsrfToken();
      console.log('CSRF Token:', csrfToken);

      // Prepare the data for the API
      const eventData = {
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
      };
      console.log('Sending event data:', eventData);

      // Send the data to your Django backend
      const apiUrl = `${API_URL}/api/events/`;
      console.log('Making request to:', apiUrl);
      
      console.log('Starting fetch request...');
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRFToken": csrfToken || '',
        },
        credentials: 'include',
        body: JSON.stringify(eventData),
      });
      console.log('Fetch request completed');

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        let errorMessage = "Failed to create event";
        
        try {
          const errorData = JSON.parse(responseText);
          console.log('Parsed error data:', errorData);
          
          if (typeof errorData === 'object') {
            const errors = Object.entries(errorData)
              .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
              .join('\n');
            errorMessage = errors || errorMessage;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
        } catch {
          console.log('Failed to parse error response as JSON');
          errorMessage = responseText || `Error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      try {
        const data = JSON.parse(responseText);
        console.log('Event created successfully:', data);
        alert('Event created successfully!'); // Add immediate feedback
        router.push("/"); // Redirect to homepage
      } catch (e) {
        console.error('Failed to parse success response:', e);
        setError("Event was created but the response was invalid");
        router.push("/"); // Still redirect since the event was likely created
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error instanceof Error ? error.message : "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#2c3050] text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#2c3050] min-h-screen flex flex-col items-center pt-16 pb-16">
      <Header />
      
      {/* Page Title */}
      <h1 className="text-white text-4xl font-semibold mb-10">
        Create A New Event
      </h1>

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-2xl mb-6 p-4 bg-red-500/80 text-white rounded-lg">
          {error}
        </div>
      )}

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#A0A7E0]/80 rounded-2xl w-full max-w-2xl px-12 py-14 space-y-8"
      >
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-white text-lg font-medium">
            Title of Event<span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter event title"
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                     text-base placeholder-gray-600 text-[#2c3050]
                     focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="text-white text-lg font-medium">
            Event Description<span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your event"
            className="w-full rounded-xl bg-[#FFECE3] px-5 py-3 
                     text-base placeholder-gray-600 text-[#2c3050]
                     focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="category" className="text-white text-lg font-medium">
            Event Category<span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleInputChange}
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                     text-base text-[#2c3050] placeholder-gray-600
                     appearance-none hover:cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          >
            <option value="" disabled>Select event category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="language" className="text-white text-lg font-medium">
            Event Language<span className="text-red-500">*</span>
          </label>
          <select
            id="language"
            name="language"
            required
            value={formData.language}
            onChange={handleInputChange}
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                     text-base text-[#2c3050] placeholder-gray-600
                     appearance-none hover:cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          >
            <option value="" disabled>Select event language</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="start_date" className="text-white text-lg font-medium">
            Start Date<span className="text-red-500">*</span>
          </label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            required
            value={formData.start_date}
            onChange={handleInputChange}
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                     text-base text-[#2c3050]
                     focus:outline-none focus:ring-2 focus:ring-[#FFA500]
                     hover:cursor-pointer"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="end_date" className="text-white text-lg font-medium">
            End Date<span className="text-red-500">*</span>
          </label>
          <input
            id="end_date"
            name="end_date"
            type="date"
            required
            value={formData.end_date}
            onChange={handleInputChange}
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                     text-base text-[#2c3050]
                     focus:outline-none focus:ring-2 focus:ring-[#FFA500]
                     hover:cursor-pointer"
          />
        </div>

        {/* Start & End Time */}
        <div className="flex flex-col space-y-2">
          <span className="text-white text-lg font-medium">Event Time<span className="text-red-500">*</span></span>
          <div className="flex gap-6">
            <div className="flex-1 flex flex-col space-y-1">
              <label htmlFor="start_time" className="text-white text-base font-medium">
                Start Time
              </label>
              <input
                id="start_time"
                name="start_time"
                type="time"
                required
                value={formData.start_time}
                onChange={handleInputChange}
                className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                         text-base text-[#2c3050]
                         focus:outline-none focus:ring-2 focus:ring-[#FFA500]
                         hover:cursor-pointer"
              />
            </div>
            <div className="flex-1 flex flex-col space-y-1">
              <label htmlFor="end_time" className="text-white text-base font-medium">
                End Time
              </label>
              <input
                id="end_time"
                name="end_time"
                type="time"
                required
                value={formData.end_time}
                onChange={handleInputChange}
                className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                         text-base text-[#2c3050]
                         focus:outline-none focus:ring-2 focus:ring-[#FFA500]
                         hover:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Capacity */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="capacity" className="text-white text-lg font-medium">
            Event Capacity
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Leave empty for unlimited capacity"
            className="w-full rounded-full bg-[#FFECE3] px-5 py-3 
                     text-base placeholder-gray-600 text-[#2c3050]
                     focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          />
        </div>

        {/* Notes */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="host_notes" className="text-white text-lg font-medium">
            Form to registration<span className="text-red-500">*</span>
          </label>
          <textarea
            id="host_notes"
            name="host_notes"
            rows={4}
            required
            value={formData.host_notes}
            onChange={handleInputChange}
            placeholder="Insert Google Form link here"
            className="w-full rounded-xl bg-[#FFECE3] px-5 py-3 
                     text-base placeholder-gray-600 text-[#2c3050]
                     focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
          />
        </div>

        {/* Additional Options */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="club_rep"
              name="club_rep"
              checked={formData.club_rep}
              onChange={(e) => setFormData(prev => ({ ...prev, club_rep: e.target.checked }))}
              className="w-5 h-5 rounded text-[#FFA500] focus:ring-[#FFA500]"
            />
            <label htmlFor="club_rep" className="text-white text-base">
              I am a club representative
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="on_campus"
              name="on_campus"
              checked={formData.on_campus}
              onChange={(e) => setFormData(prev => ({ ...prev, on_campus: e.target.checked }))}
              className="w-5 h-5 rounded text-[#FFA500] focus:ring-[#FFA500]"
            />
            <label htmlFor="on_campus" className="text-white text-base">
              This event is on campus
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#FFECE3] text-[#2c3050] 
                     rounded-full px-10 py-4 text-lg font-semibold
                     hover:brightness-105 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;