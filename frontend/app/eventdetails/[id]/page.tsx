import { notFound } from "next/navigation";
import { Event } from "@/app/types/event";
import Header from "@/app/components/header";
import Link from "next/link";
import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getEvent(id: string): Promise<Event> {
  const res = await fetch(`${API_URL}/api/events/${id}/`, { cache: 'no-store' });
  
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch event');
  }
 
  return res.json();
}

function formatDateTime(date: string, time: string) {
  const eventDate = new Date(`${date}T${time}`);
  return eventDate.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

type EventParams = Promise<{ id: string }>;

export async function generateMetadata(props: {
  params: EventParams;
}): Promise<Metadata> {
  const { id } = await props.params;
  const event = await getEvent(id);
  
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetails(props: {
  params: EventParams;
}) {
  const { id } = await props.params;
  const event = await getEvent(id);

  return (
    <div className="bg-[#2c3050] text-white min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/"
            className="text-[#ff7230] hover:text-[#ff8f5a] transition-colors"
          >
            ← Back to Events
          </Link>
        </nav>

        {/* Event Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-start gap-4 mb-6">
            <h1 className="text-4xl font-bold flex-grow">{event.title}</h1>
            <span className="inline-block bg-[#ff7230]/20 text-[#ff7230] px-4 py-2 rounded-full text-lg">
              {event.category}
            </span>
          </div>
          <div className="text-lg text-gray-300">
            {event.club_rep ? 'Student Event' : 'Waseda Event'}
          </div>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About this Event</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{event.description}</p>
            </section>

            {/* Host Notes */}
            {event.host_notes && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Registration & Additional Information</h2>
                <p className="text-gray-300 mb-4">
                  To register for this event and receive additional details from the host, please click the button below to access the registration form.
                </p>
                <a 
                  href={event.host_notes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ff7230] text-white py-3 px-6 rounded-full font-semibold
                           hover:bg-[#ff8f5a] transition-colors text-center"
                >
                  Register & Get Event Details
                </a>
              </section>
            )}
          </div>

          {/* Event Info Sidebar */}
          <div>
            <div className="bg-[#ffece3] text-[#2c3050] p-6 rounded-2xl space-y-6">
              {/* Date & Time */}
              <div>
                <h3 className="font-semibold mb-2">Date and Time</h3>
                <p>Start: {formatDateTime(event.start_date, event.start_time)}</p>
                <p>End: {formatDateTime(event.end_date, event.end_time)}</p>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p>{event.on_campus ? 'On Campus' : 'Off Campus'}</p>
              </div>

              {/* Language */}
              <div>
                <h3 className="font-semibold mb-2">Language</h3>
                <p>{event.language}</p>
              </div>

              {/* Capacity */}
              <div>
                <h3 className="font-semibold mb-2">Capacity</h3>
                <p>
                  {event.capacity 
                    ? `${event.booked}/${event.capacity} spots taken`
                    : 'Unlimited spots available'}
                </p>
              </div>

              {/* Register Button */}
              <a 
                href={event.host_notes || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-6 rounded-full font-semibold transition-colors text-center block ${
                  event.host_notes 
                    ? 'bg-[#ff7230] text-white hover:bg-[#ff8f5a]' 
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
                onClick={!event.host_notes ? (e) => e.preventDefault() : undefined}
              >
                {event.host_notes ? 'Register for Event' : 'Registration Unavailable'}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}