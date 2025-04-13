import Header from "./components/header"
import Footer from "./components/footer"
import EventTabs from "./components/event-tabs"

export default function Home() {
  return (
    <main>
      <Header />

      <div className="text-center mt-16 px-4">
  <h1 className="text-4xl sm:text-5xl font-bold mb-6">
    Discover Events at <span className="text-[#ff7230]">Waseda</span>
  </h1>
  <p className="text-xl sm:text-2xl max-w-3xl mx-auto">
    Connect with fellow students, find events that match your interests, and make the most of your university experience.
  </p>

  <div className="flex justify-center gap-x-6 mt-20">
  <button className="bg-[#ff7230] text-center text-lg sm:text-xl px-7 py-4 shadow transition duration-200 hover:shadow-lg hover:brightness-110">
    Join Now
  </button>
  <button className="bg-none border border-white text-center text-lg sm:text-xl px-7 py-4 shadow transition duration-200 hover:shadow-lg hover:brightness-110">
    Learn More
  </button>
</div>
</div>

      <EventTabs />

      <Footer />
    </main>
  )
}

