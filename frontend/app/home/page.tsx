import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import Header from "@/app/components/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#2E2B2B]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Events at <span className="text-[#9B2121]">Waseda</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-10">
            Connect with fellow students, find events that match your interests,
            and make the most of your university experience.
          </p>
          <div className="flex gap-4">
            <Link href="/signin">
              <Button size="lg" className="bg-[#9B2121] hover:bg-[#7a1b1b] text-[#FFFFFF]">
                Sign In
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-[#2E2B2B] text-[#2E2B2B] hover:bg-[#2E2B2B]/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How ConnectWaseda Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="/images/gradcap.png"
            title="University Events"
            description="Discover official events hosted by Waseda University, from academic seminars to cultural festivals."
          />
          <FeatureCard
            icon="/images/students.png"
            title="Student-Led Activities"
            description="Find events created by fellow students - join clubs, attend parties, or participate in study groups."
          />
          <FeatureCard
            icon="/images/searchicon.png"
            title="Personalized Experience"
            description="Browse events by category, club, or interest to find exactly what you're looking for."
          />
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto bg-[#2E2B2B]/5 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
          <Link href="/events">
            <Button variant="ghost" className="text-[#9B2121] hover:text-[#7a1b1b] hover:bg-[#2E2B2B]/5">
              View All Events →
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard
            title="Spring Festival 2025"
            date="April 15, 2025"
            location="Main Campus"
            category="Festival"
          />
          <EventCard
            title="Tech Innovation Workshop"
            date="April 22, 2025"
            location="Engineering Building"
            category="Academic"
          />
          <EventCard
            title="International Students Mixer"
            date="April 30, 2025"
            location="Student Center"
            category="Social"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard
            quote="ConnectWaseda helped me find my community during my first year. I've made lasting friendships through events I discovered on the platform."
            author="Yuki Tanaka"
            role="2nd Year Student"
          />
          <TestimonialCard
            quote="As an international student, this platform made it so much easier to integrate into campus life and discover events that matched my interests."
            author="Maria Chen"
            role="Exchange Student"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-12 lg:px-24 bg-[#9B2121]">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFFFFF]">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mb-8 text-[#FFFFFF]">
            Join ConnectWaseda today and never miss out on campus events again.
          </p>
          <Link href="/signin">
            <Button size="lg" className="bg-[#FFFFFF] text-[#9B2121] hover:bg-[#FFFFFF]/90">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Component for feature cards
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-[#2E2B2B]/10 p-6 rounded-lg flex flex-col items-center text-center">
      <div className="w-16 h-16 mb-4 relative">
        <Image src={icon} alt={title} width={64} height={64} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-[#2E2B2B]/80">{description}</p>
    </div>
  );
}

// Component for event cards
function EventCard({ title, date, location, category }: { title: string; date: string; location: string; category: string }) {
  return (
    <div className="bg-[#2E2B2B]/10 p-6 rounded-lg hover:bg-[#2E2B2B]/15 transition duration-300">
      <div className="bg-[#9B2121]/20 text-[#9B2121] px-2 py-1 rounded inline-block text-sm mb-4">
        {category}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-[#2E2B2B]/80 mb-1">📅 {date}</div>
      <div className="text-[#2E2B2B]/80">📍 {location}</div>
    </div>
  );
}

// Component for testimonial cards
function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="bg-[#2E2B2B]/10 p-6 rounded-lg">
      <p className="text-lg mb-4 italic">&quot;{quote}&quot;</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-[#2E2B2B]/70 text-sm">{role}</p>
      </div>
    </div>
  );
}