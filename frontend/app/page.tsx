import Header from "./components/header"
import Footer from "./components/footer"
import EventTabs from "./components/event-tabs"

export default function Home() {
  return (
    <main>
      <Header />

      <div className="topText">
        <h1>Friendship Starts Here.</h1>
        <p>Sick of spending lunch break alone?</p>
        <p>Want to join events catered to your interests?</p>
        <p>Join and host events of your own now!</p>
      </div>

      <button className="bg-[rgba(160,167,224,0.72)] text-center px-7 py-4 mt-60 ml-12 cursor-pointer rounded-full shadow transition duration-200 hover:shadow-lg hover:brightness-110">
        JOIN NOW
      </button>

      <EventTabs />

      <Footer />
    </main>
  )
}

