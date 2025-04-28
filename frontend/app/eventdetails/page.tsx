import React from "react";

const relatedEventsData = [
  {
    id: 1,
    title: "Spring Picnic",
    date: "2023-05-01T11:00",
    imageUrl: "https://via.placeholder.com/300x200?text=Picnic",
  },
  {
    id: 2,
    title: "Art Workshop",
    date: "2023-05-10T14:00",
    imageUrl: "https://via.placeholder.com/300x200?text=Art+Workshop",
  },
  {
    id: 3,
    title: "Language Exchange",
    date: "2023-05-15T18:30",
    imageUrl: "https://via.placeholder.com/300x200?text=Language+Exchange",
  },
];

export default function EventDetails() {
  return (
    <div className="bg-[#2c3050] text-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col space-y-12">
        {/* Breadcrumb / Back Link */}
        <nav aria-label="Breadcrumb">
          <a
            href="/events"
            className="text-lg text-gray-300 hover:text-white transition"
          >
            ← Back to Events
          </a>
        </nav>

        {/* Main Event Article */}
        <article aria-labelledby="event-title" className="space-y-8">
          {/* Header: Title + Category */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
            <h1
              id="event-title"
              className="text-5xl font-extrabold leading-tight"
            >
              Event Title
            </h1>
            <span className="mt-4 sm:mt-0 inline-block text-xl font-bold text-[#FF7230] bg-[#FF72305E] px-4 py-2 rounded-lg">
              Category
            </span>
          </header>

          {/* Description */}
          <section>
            <p className="text-2xl leading-relaxed">
              Event Description: Blah blah blah. Blah blah blah. Blah blah blah…
              Blah blah blah. Blah blah blah. Blah blah blah. Blah blah blah.
            </p>
          </section>

          {/* Details + Reserve Button */}
          <section className="flex flex-col md:flex-row items-end md:space-x-8 space-y-8 md:space-y-0">
            {/* Details “Pillow” */}
            <div className="flex-1 bg-[#FFECE3] text-[#2c3050] p-10 rounded-3xl space-y-6">
              <p className="text-xl">
                <span className="font-semibold">Date / Time:</span>{" "}
                <time dateTime="2023-04-17T15:00">
                  April 17, 15:00 – 18:00
                </time>
              </p>
              <p className="text-xl">
                <span className="font-semibold">Capacity:</span> 13 / 20 people
              </p>
              <p className="text-xl">
                <span className="font-semibold">Notes:</span> Please bring XYZ.
              </p>
              <p className="text-xl">
                <span className="font-semibold">Contact:</span>{" "}
                <a
                  href="mailto:xyz@gmail.com"
                  className="underline hover:no-underline"
                >
                  xyz@gmail.com
                </a>{" "}
                /{" "}
                <a href="tel:08012345678" className="underline hover:no-underline">
                  080-1234-5678
                </a>
              </p>
            </div>

            {/* Reserve Button */}
            <div className="flex-shrink-0">
              <button
                className="bg-[#FFECE3] text-[#2c3050] rounded-full px-10 py-5 text-2xl font-semibold
                           hover:brightness-105 transition-all"
                aria-label="Reserve spot for this event"
              >
                Reserve
              </button>
            </div>
          </section>
        </article>

        {/* Related Events */}
        <aside aria-labelledby="related-events" className="space-y-6">
          <h2 id="related-events" className="text-3xl font-bold">
            Related Events
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEventsData.map((ev) => (
              <div
                key={ev.id}
                className="bg-[#FFECE3] rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#2c3050] mb-2">
                    {ev.title}
                  </h3>
                  <time
                    dateTime={ev.date}
                    className="block text-gray-600 mb-4"
                  >
                    {new Date(ev.date).toLocaleString(undefined, {
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  <a
                    href={`/events/${ev.id}`}
                    className="inline-block px-4 py-2 bg-[#2c3050] text-white rounded-full hover:bg-[#1f2748] transition"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}